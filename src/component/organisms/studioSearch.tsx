import StudioSearchCard from "./searchCardComponent/studioSearchCard";

export default function StudioSearch() {
    return (
        <div key={0} style={{padding: 24}}>
            <h3 style={{textAlign: 'center'}}>スタジオを検索</h3>
            <StudioSearchCard state={{
                prefecture: [], city: [], line: [], station: [], studioName: null,
                minArea: null, maxArea: null, minPeople: null, maxPeople: null, date: [],
                fromStation: null, minPrice: null, maxPrice: null,
                minMirror: null, maxMirror: null, detailCheck: []

            }}/>
        </div>
    );
}