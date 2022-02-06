/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getLandingById, getRocketById, getLaunchpadById } from '../store/actions/landingsActions.js'

import { Loading } from '../helpers/Loading.js'
import { ImgsCarousel } from '../cmps/ImgsCarousel'
import noImg from '../assets/img/noimg.png'

export function LandingDetails(props) {

    const dispatch = useDispatch()

    const { currLanding, currRocket, currLaunchpad } = useSelector(state => state.landingsModule)
    const { landingId } = props.match.params

    const [imgSrc, setImgSrc] = useState()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(getLandingById(landingId))
    }, [dispatch, landingId])

    useEffect(() => {
        if (currLanding) dispatch(getRocketById(currLanding.rocket))
    }, [dispatch, currLanding])

    useEffect(() => {
        if (currLanding) {
            dispatch(getLaunchpadById(currLanding.launchpad))
        }
    }, [dispatch, currLanding])

    useEffect(() => {
        if (currLanding) {
            if (currLanding.links.patch.small) setImgSrc(currLanding.links.patch.small)
            else setImgSrc(noImg)
        }
    }, [currLanding])

    if (!currLanding || !currRocket || !currLaunchpad) return <Loading />

    const { links } = currLanding

    return (
        <div className="landing-details-container">
            <img className="patch-img" src={imgSrc} alt='' />
            <h1>{currLanding.name}</h1>
            <p>{currLanding.details}</p>

            <div className="articles-container">
                {links.article === links.wikipedia ?
                    <a className="button-30" href={links.wikipedia} target="_blank">This landing's Wikipedia Page</a> :
                    <>
                        <a className="button-30 article" href={links.article} target="_blank">Article about this landing</a>
                        <a className="button-30" href={links.wikipedia} target="_blank">This landing's Wikipedia Page</a>
                    </>}
            </div>
            <Link to={'/'} className="button-30">Back to Main Page</Link>
            <ImgsCarousel rocket={currRocket} launchpad={currLaunchpad} />

            <iframe
                width="400"
                height="225"
                src={`https://www.youtube.com/embed/${links.youtube_id}`}
                title="YouTube video player"
                frameBorder='0'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />

            <Link className="button-30 bottom-link" to={'/'}>Back to Main Page</Link>

        </div>
    )
}