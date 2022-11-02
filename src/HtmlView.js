import React from "react";
import sampleData from './data_sample.json';


export default function HtmlView({ width }) {
    const { data, rootNodeId } = sampleData;
    console.log("width", width)
    let htmlView, elemArr = [], tempElem;
    Object.entries(data).map(([key, value]) => {
        //console.log("key, value", key, value)
        const { id, type, componentName, nodes, settings } = value;
        if (nodes.length === 0) {
            if (type === "Img") {
                tempElem = {
                    ...tempElem,
                    [id]: React.createElement(componentName.toLowerCase(), {
                        key,
                        src: settings.general.img.src,
                        className: settings.general.className
                    })
                }
            } else {
                if (type === "Icon") {
                    tempElem = {
                        ...tempElem,
                        [id]: React.createElement("i", {
                            key,
                            className: settings.general.icon.type,
                            style: width > 992 ? settings.general.icon.style.desktop : ((width < 992 && width >= 768) ? settings.general.icon.style.tablet : settings.general.icon.style.mobile)
                        })
                    }
                } else {
                    tempElem = {
                        ...tempElem,
                        [id]: React.createElement(componentName.toLowerCase(), {
                            key,
                            className: settings.general.className,
                            style: width > 992 ? settings.style?.desktop : ((width < 992 && width >= 768) ? settings.style?.tablet : settings.style?.mobile)
                        }, settings.general.text)
                    }
                }
            }
        }
        elemArr.push(tempElem)
    })
    let htmlArr = []
    Object.entries(data).map(([key, value]) => {
        const { type, componentName, nodes, settings } = value;
        if (nodes.length > 0) {
            const childArr = []
            for (const item of nodes) {
                childArr.push(tempElem[item]);
            }
            const component = componentName === "Container" ? "div" : componentName.toLowerCase()
            htmlArr.push(React.createElement(component, {
                key,
                ...(settings.className ? {
                    className: type === "Row" ? `${settings.className} d-flex justify-content-${settings.general?.horizontalAlignment} align-items-${settings.general?.verticalAlignment}` :
                        (type === "Column" ? `${settings.className} col-md-${settings.general?.colSize.tablet} col-lg-${settings.general?.colSize.desktop}` : settings.className)
                } :
                    (settings.general?.className && {
                        className: type === "Row" ? `${settings.general?.className} d-flex justify-content-${settings.general?.horizontalAlignment} align-items-${settings.general?.verticalAlignment}` : settings.general?.className
                    }
                    )),
                style: width > 992 ? settings.general?.style?.desktop : ((width < 992 && width >= 768) ? settings.general?.style?.tablet : settings.general?.style?.mobile)
            },
                childArr
            ))
        }
    })
    htmlView = React.createElement(data[rootNodeId].componentName.toLowerCase(), {
        className: data[rootNodeId].settings.className,
        style: width > 992 ? data[rootNodeId].settings.style?.desktop : ((width < 992 && width >= 768) ? data[rootNodeId].settings.style?.tablet : data[rootNodeId].settings.style?.mobile)
    },
        htmlArr
    )
    return htmlView
}