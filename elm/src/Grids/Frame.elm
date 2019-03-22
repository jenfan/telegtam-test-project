module Grids.Frame exposing (Frame, init, updatePosition, view)

import Dials
import Grids exposing (Grid)
import Html exposing (Html)
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform)


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

        newSize =
            calcSizeOfPosition position size
    in
    { size = size
    , margins = margins
    , valuesRange = valuesRange
    , transform = Transforms.calcTransform newSize valuesRange
    , lines = lines
    , position = position
    }


calcSizeOfPosition : Range -> Size -> Size
calcSizeOfPosition ( x1, x2 ) size =
    size
        |> Tuple.mapFirst (\x -> toFloat x / (x2 - x1) |> round)
        |> Debug.log "size: "


updatePosition : Range -> Frame -> Frame
updatePosition position ({ size } as frame) =
    let
        newSize =
            calcSizeOfPosition position size
    in
    { frame
        | transform = Transforms.calcTransform newSize frame.valuesRange
        , position = position
    }


view : Frame -> Html msg
view frame =
    svg
        [ width <| String.fromInt <| Tuple.first frame.size
        , height <| String.fromInt <| Tuple.second frame.size
        , viewBoxAttr frame.size frame.margins
        , preserveAspectRatio "none"

        --, viewBox <| Transforms.viewbox frame.valuesRange frame.size
        ]
        [ viewDial frame
        , viewLines frame
        ]


viewLines : Frame -> Svg msg
viewLines frame =
    g [ translatePositionAttr frame ]
        [ Grids.viewLines frame ]


translatePositionAttr : Frame -> Attribute msg
translatePositionAttr frame =
    frame.position
        |> Tuple.mapFirst (\x -> x * -1 * (frame.size |> Tuple.first |> toFloat))
        |> Tuple.mapSecond (\y -> y * 0)
        |> Transforms.translateAttr


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
    , h + margin * 10
    ]
        |> List.map String.fromInt
        |> String.join " "
        |> viewBox
