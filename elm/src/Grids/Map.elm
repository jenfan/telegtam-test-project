module Grids.Map exposing (Map, Msg, init, resize, subscriptions, update, view)

import Grids exposing (Grid)
import Html exposing (Html)
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Size)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform)


type alias Map =
    Grid { mapBox : MapBox, id : String }


init :
    { size : Size
    , lines : List Line
    , margins : Int
    , id : String
    }
    -> Map
init { size, lines, margins, id } =
    let
        valuesRange =
            Lines.valuesRange lines

        mapBox =
            MapBoxes.init size id
    in
    { size = size
    , margins = margins
    , valuesRange = valuesRange
    , transform = Transforms.calcTransform size valuesRange
    , lines = lines
    , mapBox = mapBox
    , id = id
    }


type Msg
    = MapBoxMsg MapBoxes.Msg



-- UPDATE


update : Msg -> Map -> Map
update msg map =
    case msg of
        MapBoxMsg subMsg ->
            { map | mapBox = MapBoxes.update subMsg map.mapBox }


resize : Size -> Map -> Map
resize size map =
    map
        |> Grids.resize size
        |> (\m -> { m | mapBox = MapBoxes.resize size map.mapBox })



-- SUBSCRIPTIONS


subscriptions : Sub Msg
subscriptions =
    Sub.map MapBoxMsg MapBoxes.subscriptions



-- VIEW


view : Map -> Html Msg
view grid =
    svg
        [ width <| String.fromInt <| Tuple.first grid.size - grid.margins * 2
        , height <| String.fromInt <| Tuple.second grid.size
        , viewBoxAttr grid.size grid.margins
        , id "svgMap"
        , Attr.style "margin: 0 20px"

        --, viewBox <| Transforms.viewbox grid.valuesRange grid.size
        ]
        [ g [] []
        , viewMapBox grid
        , Grids.viewLines grid
        , viewBackground grid

        --, background grid.size
        ]


viewMapBox : Map -> Svg Msg
viewMapBox map =
    Svg.map MapBoxMsg (MapBoxes.view map.mapBox)


viewBackground : Map -> Svg Msg
viewBackground map =
    Svg.map MapBoxMsg (MapBoxes.viewBackground map.mapBox)



--background : Size -> Svg Msg
--background ( w, h ) =
--    rect
--        [ width <| String.fromInt <| w
--        , height <| String.fromInt h
--        , x "0"
--        , y <| String.fromInt <| -1 * h
--        --, Attr.cursor cursor
--        , fillOpacity "0.75"
--        , fill "#eee"
--        ]
--        []


viewBoxAttr : Size -> Int -> Attribute msg
viewBoxAttr ( w, h ) margin =
    [ 0
    , h * -1
    , w + 10
    , h
    ]
        |> List.map String.fromInt
        |> String.join " "
        |> viewBox
