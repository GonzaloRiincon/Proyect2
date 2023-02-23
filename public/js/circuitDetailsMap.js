let myMap


const circuitId = document.querySelector('#id').value

axios
    .get(`/api/circuit/${circuitId}`)
    .then(({ data }) => {
        setMarkers(data)
    })
    .catch(err => console.log(err))


function initMap() {

    myMap = new google.maps.Map(
        document.querySelector('#map'),
        {
            zoom: 12,
            center: { lat: -34.9272, lng: 138.617 },
        }
    )
}



function setMarkers(circuit) {
    const lat = +circuit[0].Location.lat
    const lng = +circuit[0].Location.long

    myMap.setCenter({ lat, lng })

    new google.maps.Marker({
        map: myMap,
        position: { lat, lng },
        title: circuit[0].circuitName
    })

}