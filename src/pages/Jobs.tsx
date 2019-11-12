import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import MainMenuSimple from '../components/MainMenuSimple'
import { mainMenuSimpleState } from '../redusers/initState'
import Breadcrumbp from '../components/Breadcrumbp'
import { GET_JOBS_URL } from '../constants'

interface JobObject {
    id:number,
    title:string,
    description:string
}

interface JobsData {
    jobs:JobObject[]
}

const SingleJob = (props:{job:JobObject}) => {
    const { title, description } = props.job
    return (
        <Fragment>
            <h2>{title}</h2>
            <p>{description}</p>
            <hr/>
            <p style={{height:"50px"}}></p>
        </Fragment>
    )
}

const JobsTemplate = (props:JobsData) => {
    const { jobs } = props
    return (
        <div className="Jobs" style={{textAlign:"left"}}>
            <MainMenuSimple { ...mainMenuSimpleState }/>
            <div className="header">
                <div className="content standart-container">
                    <h1 className="title">Вакансії</h1>
                    <Breadcrumbp
                        pages={[{
                            name:"Головна",
                            url:"/"
                        },{
                            name:"Вакансії",
                            url:null
                        }]}
                    />
                </div>
            </div>

            <div className="body standart-container">
                <div className="divider"></div>
                <div className="text">
                    {jobs.map( (job, index) => {
                        return <SingleJob key={`single-job-${index}`} job={job}/>
                    })}
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}



class Jobs extends React.Component<{}, JobsData> {

    constructor(props:{}, state:JobsData) {
        super(props, state)

        this.state = {
            ...state
        }
        this.getJobs = this.getJobs.bind(this)
    }

    getJobs() {
        axios.get(GET_JOBS_URL)
        .then((response) => {
            console.log("RESPONSE", response.status)
            if (response.status === 200) {
                this.setState({jobs:response.data})
            }
        })
        .catch((error) => {
            
        })
        .finally(() => {

        })
    }

    componentWillMount() {
        this.getJobs()
    }

    render() {
        console.log("state", this.state)
        const jobs = this.state.jobs || []
        return (
            <JobsTemplate jobs={jobs}/>
        )
    }
}

export default connect()(Jobs)