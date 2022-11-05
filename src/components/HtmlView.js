import Main from './Main';
import { useSelector, useDispatch } from "react-redux";

export default function HtmlView() {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { data, rootNodeId } = state.data;
    const SectionElement = data[rootNodeId].componentName.toLowerCase();
    return (
        <>
            <button className="btn sticky" onClick={() => dispatch({ type: 'EDIT_MODE', mode: !state.mode })}>
                Edit
            </button>
            <SectionElement
                style={data[rootNodeId].settings.style.desktop}
                className={data[rootNodeId].settings.className}
            >
                {Object.entries(data).map(([key, value]) => key !== rootNodeId && value.nodes.length > 0 && (
                    <Main key={key} {...value} from="parent" />
                ))}
            </SectionElement>
        </>
    )
}
