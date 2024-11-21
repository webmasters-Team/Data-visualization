// Add the nodes option through an event call. We want to start with the parent
// item and apply separate colors to each child element, then the same color to
// grandchildren.
Highcharts.addEvent(
    Highcharts.seriesTypes.networkgraph,
    'afterSetOptions',
    function (e) {
        var colors = Highcharts.getOptions().colors,
            i = 0,
            nodes = {};
        e.options.data.forEach(function (link) {

            if (link[0] === 'Data visualization') {
                nodes['Data visualization'] = {
                    id: 'Data visualization',
                    marker: {
                        radius: 20
                    }
                };
                nodes[link[1]] = {
                    id: link[1],
                    marker: {
                        radius: 10
                    },
                    color: colors[i++]
                };
            } else if (nodes[link[0]] && nodes[link[0]].color) {
                nodes[link[1]] = {
                    id: link[1],
                    color: nodes[link[0]].color
                };
            }
        });

        e.options.nodes = Object.keys(nodes).map(function (id) {
            return nodes[id];
        });
    }
);

Highcharts.chart('container', {
    chart: {
        type: 'networkgraph',
        height: '100%'
    },
    title: {
        text: 'Data visualization'
    },
  
    plotOptions: {
        networkgraph: {
            keys: ['from', 'to'],
            layoutAlgorithm: {
                enableSimulation: true,
                friction: -0.9
            }
        }
    },
    series: [{
        dataLabels: {
            enabled: true,
            linkFormat: ''
        },
        data: [
            ['Temporal', 'Time series(6)'],
            ['Temporal', 'Timeline(4)'],
            ['Temporal', 'Alluvial Diagram (3)'],
            ['Data visualization', 'Temporal'],
            ['Data visualization', 'nD/Multi-Dimensional'],
            ['nD/Multi-Dimensional', 'Line chart(5)'],
            ['nD/Multi-Dimensional', 'Bar chart(3)'],
            ['nD/Multi-Dimensional', 'Bubble chart(4)'],
            ['nD/Multi-Dimensional', 'Heat map(4)'],
            ['nD/Multi-Dimensional', 'Histogram(2)'],
            ['nD/Multi-Dimensional', 'Radar chart (1)'],
            ['nD/Multi-Dimensional', 'Pie charts(3)'],
           ['nD/Multi-Dimensional', 'Box plot(4)'],
           ['nD/Multi-Dimensional', 'Scatter plot(5)'],
           ['Data visualization', 'Tree/Hierarchy'],
           ['Tree/Hierarchy', 'Sunburst chart(1)'],
             ['Tree/Hierarchy', 'tree Map(2)'],
           ['Data visualization', '2-D Planner'],
          ['2-D Planner', 'Choropleth (3)'],
               
          ['Data visualization', 'Network'],
               ['Network', 'Node-link diagram(3)'],
               ['Data visualization', 'Customized  visualization(3)'],
        ]
    }]
});