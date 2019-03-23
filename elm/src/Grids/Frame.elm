module Grids.Frame exposing (Frame, init, updatePosition, view)

import Dials
import Grids exposing (Grid)
import Html exposing (Html)
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform, Translate)


type alias Frame =
    Grid { position : Range }


init :
    { size : Size
    , lines : List Line
    , margins : Int
    , position : Range
    }
    -> Frame
init { size, lines, margins, position } =
    let
        valuesRange =
            Lines.valuesRange lines
    in
    { size = size
    , margins = margins
    , valuesRange = valuesRange
    , transform = Transforms.calcTransform size valuesRange
    , lines = lines
    , position = position
    }


updatePosition : Range -> Frame -> Frame
updatePosition position ({ size } as frame) =
    { frame | position = position }


view : Frame -> Html msg
view frame =
    svg
        [ width <| String.fromInt <| Tuple.first frame.size - frame.margins
        , height <| String.fromInt <| Tuple.second frame.size
        , viewBoxAttr frame.size frame.margins
        , preserveAspectRatio "none"
        , class "frame"

        --, viewBox <| Transforms.viewbox frame.valuesRange frame.size
        ]
        [ viewDial frame
        , viewLines frame
        ]


viewLines : Frame -> Svg msg
viewLines frame =
    Grids.viewLines frame
        |> Transforms.transformToPositionGroup frame.position frame.size


calcBoxPosTranslate : Range -> Size -> Translate
calcBoxPosTranslate ( x1, x2 ) ( width, _ ) =
    ( toFloat width * x1 / (x1 - x2), 0 )


viewDial : Frame -> Svg msg
viewDial frame =
    case frame.valuesRange of
        Just range ->
            let
                dial =
                    Dials.init frame.size
            in
            Dials.view frame.size range frame.transform dial

        Nothing ->
            g [] []


viewBoxAttr : Size -> Int -> Attribute msg
viewBoxAttr ( w, h ) margin =
    [ 0 - margin
    , (h + margin) * -1
    , w + margin
    , h + margin * 7
    ]
        |> List.map String.fromInt
        |> String.join " "
        |> viewBox
