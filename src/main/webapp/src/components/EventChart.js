import React, {Component, useEffect} from 'react';
import { Chart } from 'primereact/chart';
import axios from "axios";

export class EventChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            labels: [],
            datasets: [
                {
                    label: 'Applications for Events',
                    backgroundColor: '#42A5F5',
                    data: []
                }
            ]
        };
        this.options = this.getLightTheme();
    }


    componentDidMount() {
        axios.get("/events/").then(response=>{
        response.data.map(event=>{
            let labels=[...this.state.labels];
            labels.push(event.name);
            let datas=[...this.state.datasets[0].data];
            datas.push(event.applicantNumber);
            this.setState({labels:labels});
            this.setState({datasets:[{
                    label: 'Applications for Events',
                    backgroundColor: '#42a5f5',
                    data: datas}
                ]});
    })
    })}


   /* componentDidMount()  {
        this.setState({labels:this.props.labels});
        this.setState({datasets:[{
                label: 'Applications for Events',
                backgroundColor: '#42A5F5',
                data: this.props.datas}
            ]});
    }
*/
    getLightTheme() {
        let basicOptions = {
            legend: {
                labels: {
                    fontColor: '#495057'
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: '#495057'
                    }
                }]
            }
        };

        return {
            basicOptions,
        }
    }

    render() {
        const { basicOptions} = this.options;

        return (
            <div>
                <div className="card">
                    <h5>Applications for Events</h5>
                    <Chart type="bar" data={this.state} options={basicOptions} />
                </div>

            </div>
        )
    }
}