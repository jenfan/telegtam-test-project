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
    -> ( Map, Cmd Msg )
init { size, lines, margins, id } =
    let
        valuesRange =
            Lines.valuesRange lines

        ( mapBox, cmd ) =
            MapBoxes.init size id
    in
    ( { size = size
      , margins = margins
      , valuesRange = valuesRange
      , transform = Transforms.calcTransform size valuesRange
      , lines = lines
      , mapBox = mapBox
      , id = id
      }
    , Cmd.map MapBoxMsg cmd
    )


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
        [ width <| String.fromInt <| Tuple.first grid.size - 10
        , height <| String.fromInt <| Tuple.second grid.size
        , viewBoxAttr grid.size grid.margins
        , class "svgMap"

        --, viewBox <| Transforms.viewbox grid.valuesRange grid.size
        ]
        [ viewMapBox grid
        , Grids.viewLines grid
        ]


viewMapBox : Map -> Svg Msg
viewMapBox map =
    Svg.map MapBoxMsg (MapBoxes.view map.mapBox)


viewBoxAttr : Size -> Int -> Attribute msg
viewBoxAttr ( w, h ) margin =
    [ 0 - margin * 5
    , (h + margin) * -1
    , w + margin * 10
    , h + margin * 10
    ]
        |> List.map String.fromInt
        |> String.join " "
        |> viewBox
