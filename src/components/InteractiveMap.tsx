import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, TrendingUp, Users } from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  location: [number, number]; // [longitude, latitude]
  region: string;
  crops: string[];
  impact: string;
  data: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'ca-central',
    name: "San Joaquin Almond Alliance",
    location: [-120.2, 36.8],
    region: "Central Valley, California, USA",
    crops: ["Almonds", "Pistachios"],
    impact: "37% reduction in water stress markers",
    data: "AGP4 enabled a 22% reduction in synthetic nutrient load while maintaining industry-standard kernel weights."
  },
  {
    id: 'wa-yakima',
    name: "Yakima Hops Collective",
    location: [-120.5, 46.6],
    region: "Yakima Valley, Washington, USA",
    crops: ["Hops", "Apples"],
    impact: "94% absorption efficiency in high wind conditions",
    data: "Field trials showed micelle technology prevented evaporation during peak summer heat, increasing alpha acid consistency by 12%."
  },
  {
    id: 'es-almeria',
    name: "Almería Greenhouse Hub",
    location: [-2.4, 36.8],
    region: "Almería, Spain",
    crops: ["Tomatoes", "Peppers", "Cucumbers"],
    impact: "42% increase in nutrient uptake",
    data: "Implemented AGP4 in high-density greenhouse environments to overcome salt-build up and improve root-zone absorption efficiency."
  },
  {
    id: 'br-matogrosso',
    name: "Mato Grosso Grain Belt",
    location: [-56.0, -13.0],
    region: "Mato Grosso, Brazil",
    crops: ["Soybeans", "Corn"],
    impact: "24% higher yield in tropical conditions",
    data: "Proven performance in high-humidity tropical zones where AGP4 prevented rapid wash-off during heavy afternoon rains."
  },
  {
    id: 'cl-maipo',
    name: "Maipo Valley Vineyards",
    location: [-70.7, -33.6],
    region: "Maipo Valley, Chile",
    crops: ["Premium Wine Grapes"],
    impact: "Enhanced phenolic maturity",
    data: "Directed nutrient delivery allowed for precise stress management, resulting in superior grape quality and higher market value."
  }
];

export const InteractiveMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomGRef = useRef<SVGGElement>(null);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const zoomRef = useRef<any>(null);
  const projectionRef = useRef<any>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updateDimensions();

    return () => resizeObserver.disconnect();
  }, []);

  const handleRegionClick = (story: SuccessStory) => {
    setSelectedStory(story);
    if (svgRef.current && projectionRef.current && zoomRef.current) {
      const coords = projectionRef.current(story.location);
      if (coords) {
        const svg = d3.select(svgRef.current);
        svg.transition().duration(750).call(
          zoomRef.current.transform,
          d3.zoomIdentity
            .translate(dimensions.width / 2, dimensions.height / 2)
            .scale(4)
            .translate(-coords[0], -coords[1])
        );
      }
    }
  };

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g");
    
    // Configure Projection for World View
    const projection = d3.geoMercator()
      .center([-30, 20]) 
      .scale(dimensions.width / 4)
      .translate([dimensions.width / 2, dimensions.height / 2]);
    
    projectionRef.current = projection;

    const path = d3.geoPath().projection(projection);

    // Zoom functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    
    zoomRef.current = zoom;

    svg.call(zoom);

    // Fetch World topology
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((world: any) => {
      const countries = topojson.feature(world, world.objects.countries) as any;

      // Draw map
      const countryPaths = g.append("g")
        .selectAll("path")
        .data(countries.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "var(--color-primary-dark)")
        .attr("fill-opacity", 0.05)
        .attr("stroke", "var(--color-primary)")
        .attr("stroke-width", 0.5)
        .attr("stroke-opacity", 0.15)
        .attr("class", "country-path cursor-pointer transition-all duration-700 hover:fill-opacity-10")
        .on("click", function(event, d: any) {
          event.stopPropagation();
          const [mx, my] = d3.pointer(event, g.node());
          const geoPoint = projection.invert!([mx, my]);
          
          if (geoPoint) {
            let nearest = SUCCESS_STORIES[0];
            let minDistance = Infinity;
            SUCCESS_STORIES.forEach(story => {
              const d = d3.geoDistance(geoPoint as [number, number], story.location as [number, number]);
              if (d < minDistance) { minDistance = d; nearest = story; }
            });
            if (minDistance < 0.8) handleRegionClick(nearest);
          }
        });

      // Highlight country if selected
      if (selectedStory) {
        countryPaths.filter((d: any) => {
          // Simplistic check: if any story point is inside the country path
          // We can use d3.geoContains for accurate highlighting
          return d3.geoContains(d, selectedStory.location as [number, number]);
        })
        .transition().duration(500)
        .attr("fill-opacity", 0.15)
        .attr("fill", "var(--color-primary)");
      }

      // Add Pins
      const pins = g.append("g")
        .selectAll("g")
        .data(SUCCESS_STORIES)
        .enter()
        .append("g")
        .attr("transform", d => {
          const coords = projection(d.location as [number, number]);
          return coords ? `translate(${coords[0]}, ${coords[1]})` : null;
        })
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          event.stopPropagation();
          handleRegionClick(d);
        });

      // Pin base ripple
      pins.append("circle")
        .attr("r", 15)
        .attr("fill", "var(--color-primary)")
        .attr("class", d => `ripple-animation ${selectedStory?.id === d.id ? 'ripple-active' : ''}`);

      // Pin circle
      pins.append("circle")
        .attr("r", d => selectedStory?.id === d.id ? 8 : 5)
        .attr("fill", d => selectedStory?.id === d.id ? "white" : "var(--color-primary)")
        .attr("stroke", d => selectedStory?.id === d.id ? "var(--color-primary)" : "white")
        .attr("stroke-width", 2)
        .attr("class", "transition-all duration-300");

      // Label (hidden by default)
      pins.append("text")
        .text(d => d.name.split(' ')[0])
        .attr("y", -15)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--color-primary)")
        .attr("font-size", "10px")
        .attr("font-weight", "900")
        .attr("class", "uppercase tracking-tighter opacity-0 transition-opacity duration-300 pointer-events-none");

      pins.on("mouseenter", function() {
        d3.select(this).select("text").transition().duration(200).style("opacity", 1);
      }).on("mouseleave", function() {
        d3.select(this).select("text").transition().duration(200).style("opacity", 0);
      });
    });

  }, [dimensions]);

  return (
    <div ref={containerRef} className="relative w-full h-[650px] bg-white border border-primary/5 shadow-2xl overflow-hidden group">
      <div className="absolute inset-0 structural-grid opacity-[0.02] pointer-events-none"></div>
      
      {/* Background Text Overlay */}
      <div className="absolute top-10 left-10 z-0 select-none pointer-events-none opacity-[0.02]">
        <h2 className="text-[120px] font-headline font-black leading-none text-primary">GLOBAL DATA</h2>
      </div>

      <svg ref={svgRef} width="100%" height="100%" className="relative z-10 touch-none" />

      {/* Map Legend/Controls */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-4">
        <div className="bg-on-surface text-white p-4 border-l-4 border-primary shadow-2xl backdrop-blur-md bg-opacity-90">
          <div className="text-[8px] font-black uppercase tracking-[0.4em] opacity-60 mb-2 font-body font-bold">Field Deployment Map</div>
          <div className="text-2xl font-headline font-black tracking-tight leading-none uppercase italic">Global Network</div>
        </div>
        
        <div className="flex gap-2">
          <div className="bg-white/80 backdrop-blur px-4 py-2 border border-outline-variant/30 text-[9px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
            World Class Standards
          </div>
        </div>
      </div>

      {/* Region Selector Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-md border-t border-outline-variant/20 p-4 md:p-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-8 min-w-max px-4">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-on-surface/40 font-body">Quick Jump:</span>
          {SUCCESS_STORIES.map((story) => (
            <button 
              key={story.id}
              onClick={() => handleRegionClick(story)}
              className={`text-[10px] font-black uppercase tracking-widest transition-all hover:text-primary font-body flex items-center gap-2 group ${selectedStory?.id === story.id ? 'text-primary' : 'text-on-surface/60'}`}
            >
              <MapPin size={12} className={`transition-transform duration-300 ${selectedStory?.id === story.id ? 'scale-125' : 'group-hover:scale-110'}`} />
              {story.region.split(',')[0]}
              <span className={`h-px w-0 bg-primary transition-all duration-500 group-hover:w-full ${selectedStory?.id === story.id ? 'w-full' : ''}`}></span>
            </button>
          ))}
        </div>
      </div>

      {/* Success Story Overlay */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-white z-30 shadow-[-20px_0_60px_rgba(0,0,0,0.1)] border-l border-outline-variant/20 p-10 overflow-y-auto"
          >
            <button 
              onClick={() => setSelectedStory(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all"
            >
              <X size={18} />
            </button>

            <div className="mb-10 pt-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-4 block font-body">Case Study Selection</span>
              <h3 className="text-4xl font-headline font-black text-on-surface tracking-tight leading-tight mb-2">
                {selectedStory.name}
              </h3>
              <div className="flex items-center gap-2 text-on-surface-variant/60 font-body text-sm italic">
                <MapPin size={14} className="text-primary" />
                {selectedStory.region}
              </div>
            </div>

            <div className="space-y-10">
              <div className="p-6 bg-surface-container/50 border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp size={20} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface font-body">Core Impact</span>
                </div>
                <p className="text-xl font-headline font-black text-on-surface tracking-tight">
                  {selectedStory.impact}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={16} className="text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-on-surface font-body font-bold">Implementation Details</span>
                </div>
                <p className="text-on-surface-variant font-body font-light leading-relaxed text-sm">
                  {selectedStory.data}
                </p>
              </div>

              <div className="pt-8 border-t border-outline-variant/20">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-6 block font-body">Crops Optimized</span>
                <div className="flex flex-wrap gap-2">
                  {selectedStory.crops.map(crop => (
                    <span key={crop} className="px-4 py-2 bg-on-surface text-white text-[9px] font-bold uppercase tracking-widest font-body">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary-dark transition-all active:scale-95 shadow-xl font-body mt-10">
                Download Full Datasheet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
