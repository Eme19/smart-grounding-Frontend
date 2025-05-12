//useGroundingChart.tsx
import { useEffect } from "react";
import * as d3 from "d3";
export type DataPoint = {
  timestamp: string;
  ground_resistance: number;
  temperature: number;
  fault_status: boolean;
};

export const useGroundingChart = (
  data: DataPoint[],
  metric: "ground_resistance" | "temperature",
  dimensions: { width: number; height: number }
) => {
  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select("#chart");
    svg.selectAll("*").remove();

    const { width, height } = dimensions;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.attr("width", width).attr("height", height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.timestamp)) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[metric])! + 2])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line<DataPoint>()
      .x((d) => x(new Date(d.timestamp)))
      .y((d) => y(d[metric]));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr(
        "stroke",
        data[data.length - 1].fault_status ? "#dc2626" : "#3b82f6"
      )
      .attr("stroke-width", 1)
      .attr("d", line);

    svg
      .selectAll("circle")
      .data(data.filter((d) => d.fault_status))
      .enter()
      .append("circle")
      .attr("cx", (d) => x(new Date(d.timestamp)))
      .attr("cy", (d) => y(d[metric]))
      .attr("r", 2.5)
      .attr("fill", "#dc2626");

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [data, metric, dimensions]);
};
