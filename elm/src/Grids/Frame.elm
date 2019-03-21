module Grids.Frame exposing (init, view)

import Dials
import Grids exposing (Grid)
import Html exposing (Html)
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform)


init : { size : Size, lines : List Line, margins : Int } -> Grid
init { size, lines, margins } =
    let
        valuesRange =
            Lines.valuesRange lines
    in
    { size = size
    , margins = margins
    , valuesRange = valuesRange
    , transform = Transforms.calcTransform size valuesRange
    , lines = lines
    , mapBox = Nothing
    }



-- VIEW


view : Grid -> Html msg
view grid =
    svg
        [ width <| String.fromInt <| Tuple.first grid.size
        , height <| String.fromInt <| Tuple.second grid.size
        , viewBoxAttr grid.size grid.margins

        --, viewBox <| Transforms.viewbox grid.valuesRange grid.size
        ]
        [ viewDial grid
        , Grids.viewLines grid
        ]


viewDial : Grid -> Svg msg
viewDial grid =
    case grid.valuesRange of
        Just range ->
            let
                dial =
                    Dials.init grid.size
            in
            Dials.view grid.size range grid.transform dial

        Nothing ->
            g [] []


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
