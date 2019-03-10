module Grids exposing (Grid, init, view)

import Lines exposing (Line)
import Ranges exposing (Range, XYRanges)
import Svg exposing (..)
import Svg.Attributes exposing (..)


type alias Grid =
    { size : ( Int, Int )
    , rowsNum : Int
    , xyRanges : Maybe XYRanges
    , lines : List Line
    }


init : Int -> Int -> List Line -> Grid
init width height lines =
    { size = ( width, height )
    , rowsNum = 6
    , xyRanges = Ranges.xyRanges lines
    , lines = lines
    }


view : Grid -> Svg msg
view grid =
    case grid.xyRanges of
        Just xyRanges ->
            svg
                [ width <| String.fromInt <| Tuple.first <| grid.size
                , height <| String.fromInt <| Tuple.second <| grid.size
                ]
                [ drawAxes grid.size xyRanges
                ]

        Nothing ->
            svg [] []


drawAxes : ( Int, Int ) -> XYRanges -> Svg msg
drawAxes ( width, height ) ( ( minX, maxX ), ( minY, maxY ) ) =
    svg []
        [ Svg.line
            [ x1 "0"
            , y1 "0"
            , x2 "0"
            , y2 <| String.fromInt height
            , stroke "black"
            , strokeWidth "3"
            ]
            []
        , Svg.line
            [ x1 "0"
            , y1 <| String.fromInt height
            , x2 <| String.fromInt height
            , y2 <| String.fromInt height
            , stroke "black"
            , strokeWidth "3"
            ]
            []
        ]
