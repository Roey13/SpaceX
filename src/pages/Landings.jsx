/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import ReactPaginate from "react-paginate";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { getLandings } from '../store/actions/landingsActions.js'
import { Loading } from '../helpers/Loading.js'
import { Card } from '../cmps/Card'
import { useDebounced } from '../hoooks/use-debounce.js'

export function Landings() {

    const dispatch = useDispatch()
    const { landings } = useSelector(state => state.landingsModule)

    const [filteredLandings, setFilteredLandings] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [searchVal, setSearchVal] = useState('')
    const [radioVal, setRadioVal] = useState('all')

    useEffect(() => {
        dispatch(getLandings())
    }, [dispatch])

    useEffect(() => {
        setFilteredLandings(landings)
    }, [landings])

    let debouncedSearchVal = useDebounced(searchVal.toLowerCase(), 500)

    useEffect(() => {
        if (landings) {
            let res = []
            landings.map((landing) => {
                if (radioVal === 'all') {
                    if (landing.name.toLowerCase().includes(debouncedSearchVal)) res.push(landing)
                } else if (radioVal === 'success') {
                    if (landing.name.toLowerCase().includes(debouncedSearchVal) && landing.success) res.push(landing)
                } else {
                    if (landing.name.toLowerCase().includes(debouncedSearchVal) && !landing.success) res.push(landing)
                }

            })
            setFilteredLandings(res)
        }
    }, [debouncedSearchVal, radioVal, landings])

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const searchValHandler = (ev) => {
        setSearchVal(ev.target.value)
    }

    const handleRadio = (ev) => {
        setRadioVal(ev.target.value)
    }

    if (!filteredLandings) return <Loading />

    const landingsPerPage = 21;
    const pagesVisited = pageNumber * landingsPerPage;
    const displayLandings = filteredLandings
        .slice(pagesVisited, pagesVisited + landingsPerPage)
        .map((landing) => {
            return (
                    <div className="landing-container" title={landing.name} key={landing.id}>
                        <Card landing={landing} />
                    </div>
            );
        });

    const pageCount = Math.ceil(filteredLandings.length / landingsPerPage);

    return (
        <div className="landings-page-container">

            <div className="filtering-container">
                <form className="search-container">
                    <input type="text" id="search" name="success" value={searchVal} onChange={searchValHandler} />
                </form>

                <FormControl component="fieldset">
                    <RadioGroup row aria-label="isSuccessful" name="controlled-radio-buttons-group" value={radioVal} onChange={handleRadio}>
                        <FormControlLabel value="success" control={<Radio />} label="Success" />
                        <FormControlLabel value="failure" control={<Radio />} label="Failure" />
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div className="landings-container">
                {displayLandings}
            </div>

            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
            </div>
        </div>
    )
}
