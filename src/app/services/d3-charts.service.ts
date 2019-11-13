import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Axis } from 'd3';

export interface exampleData {
  letter: any;
  frequency: Number;
}

@Injectable({
  providedIn: 'root'
})

export class D3ChartsService {

  margin = {top: 20, right: 20, bottom: 30, left: 40};
  constructor() { }
  

  lineChart(chartContainer, data) {
    d3.select('svg').remove();

    const element = chartContainer.nativeElement;

    const svg = d3.select(element)
      .append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight)
      .append("g")
          .attr("transform",
          "translate(" + this.margin.left + "," + this.margin.top + ")");

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, contentWidth]);

    const yScale = d3.scaleLinear()
      .domain(
        d3.extent((d3.extent(data, d => +d) as Array<number>).concat([0]))
      )
      .range([contentHeight - +d3.min(data), 0 ]);

    svg.append("g")
      .call(d3.axisLeft(yScale));


    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (yScale(0)) + ')')
      .call(d3.axisBottom(xScale));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d, i) => xScale(i))
        .y((d) => yScale(+d))
      )
  }



  dataStream2(chartContainer) {
    
    const element = chartContainer.nativeElement;
    var limit = 30 * 1,
        buff = 3,
        now = this.now;

        const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
        const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

        const defaultTimeGap = 1000;
        var groups = {
            current: {
                value: 0,
                color: 'orange',
                data: d3.range(limit).map((item, i) => {
                  return {
                    time: +now - (limit - i) * defaultTimeGap,
                    value: 0
                  }
                })
            }
        }

        var x = d3.scaleTime()
            .domain([+now - (limit - buff) * defaultTimeGap, +now - defaultTimeGap])
            .range([0, contentWidth])
            
        var y = d3.scaleLinear()
            .domain([-10, 10])
            // .domain([-150, 150])
            .range([contentHeight, 0])

        var line = d3.line()
        // curveBasis
            .curve(d3.curveLinear)
            .x((d, i) => x(+d['time']))
            
        var svg = d3.select(element).append('svg')
            .attr('class', 'chart')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
   
        svg.append("defs").append("clipPath")
          .attr("id", "clip")
          .append("rect")
          .attr("width", contentWidth + 1)
          // contentWidth - 50
          .attr("height", element.offsetHeight);
        
        var wrapper = svg.append('g')
            .attr('class', 'wrapper')
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)            
            .append('g') 
            .attr("clip-path", "url(#clip)")
    
        var xAxis = wrapper.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${contentHeight / 2})`)
            .call(d3.axisBottom(x))

        var yAxis = svg.append('g')
        .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .attr('class', 'y axis')
            .call(d3.axisLeft(y))

        const movePoint = svg.append('circle')
          .attr('class', 'move-point')
          .attr("cx", contentWidth)
          .attr("cy", y(0))
          .attr("r", 10)
          .attr("transform", `translate(${-10}, ${this.margin.top})`) 
          .style("fill", 'red')

        const paths = wrapper.append('g')
        
        


        for (var name in groups) {
            var group = groups[name]
            group.path = paths.append('path')
                .data([group.data])
                .attr('class', name + ' group')
                .style('stroke', group.color)
        }

        function redrawData() {
          now = this.now;
          // const moveDuration = 1000; //defaultTimeGap;
            let absMax = 0, pointX = now, pointY = 0;
            // Add new values
            for (var name in groups) {
                var group = groups[name]
                //group.data.push(group.value) // Real values arrive at irregular intervals
                
                
                // Move point
                const currentIndex = group.data.length - buff + 2, 
                point = group.data[currentIndex],
                prePoint = group.data[currentIndex - 1],
                moveDuration = point['time'] - prePoint['time'];
                movePoint
                  .transition()
                  // point['time']
                  .attr("cx", x(this.now - 1000))
                  .attr("cy", y(point['value']))
                  .duration(moveDuration)
                  .ease(d3.easeLinear)



                absMax = +d3.max(group.data.map(item => Math.abs(item.value)))
            }

            // Shift y domain
            // y.domain([-absMax, absMax])

            for (var name in groups) {
                var group = groups[name]
                // console.log(group)
                group.path
                  .attr('d', line.y(d => {
                    return y(+d['value'])
                  }))
            }            

            // Shift x domain
            x.domain([+now - (limit - buff) * defaultTimeGap, +now - defaultTimeGap])

            // Slide x-axis left
            xAxis.transition()
                .duration(defaultTimeGap)
                .ease(d3.easeLinear)
                .call(d3.axisBottom(x))
            

            // Slide y-axis left
            yAxis.transition()
              .duration(defaultTimeGap)
              .ease(d3.easeLinear)
              .call(d3.axisLeft(y))

            
              

            // Slide paths left
            // console.log(this.now)
            paths.attr('transform', null)
                .transition()
                .duration(defaultTimeGap)
                .ease(d3.easeLinear)
                .attr('transform', 'translate(' + x(+now - (limit - buff + 1) * defaultTimeGap) + ')')
                .on('end', renewData.bind(this))

            // Remove oldest data point from each group
            for (var name in groups) {
                var group = groups[name]
                group.data.shift()
            }
        }

        


      let temp = []
      function renewData() {
        // console.log(temp)
        const data = Math.random() * 20 - 10;
        // if (temp.length > 0) {
        //   // group.data.push(temp.shift());
        //   // console.log(temp.shift(), data)
        //   group.data.push({
        //     time: +now + Math.random() * 1000,
        //     value: data// temp.shift().value
        //   })
        // }
        group.data.push({
          time: +now , //+ Math.random() * 1000,
          value: data// temp.shift().value
        })
          
        redrawData.call(this)
      }

      function updateData({data, gap}) {
        // console.log(group, data)
        console.log(data)
        temp = data;
        // group.data = group.data.concat(data);
        // console.log(group)
        setTimeout(() => {
          console.log(this)
          renewData.call(this);
        })
      }
      
      renewData.call(this)

      return updateData;

  }


  get now(): Number {
    const delay = 1000;
    return +new Date(Date.now() - delay);
  }


}
