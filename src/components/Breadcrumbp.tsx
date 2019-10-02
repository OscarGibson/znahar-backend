import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

interface IBreadcrumbpPage {
    name:string,
    url:string|null
}

interface IBreadcrumbp {
    pages:IBreadcrumbpPage[]
}

const renderLink = (page:IBreadcrumbpPage) => {
    if (page.url) {
        return (
            <Link to={page.url}>{page.name}</Link>
        )
    } else {
        return (
            <span>{page.name}</span>
        )
    }
}

const renderDivider = (index:number, length:number) => {
    if (index !== length - 1) {
        return (
            <span>/</span>
        )
    } else {
        return (
            <span></span>
        )
    }
}

const Breadcrumbp = ({pages}:IBreadcrumbp) => {
    const length = pages.length
    return (
        <p className="breadCrumpb">
            {pages.map( (page, index) => {
                return (
                    <span key={index}>
                        {renderLink(page)}{renderDivider(index, length)}
                    </span>
                )
            })}
        </p>
    )
}

export default connect()(Breadcrumbp)