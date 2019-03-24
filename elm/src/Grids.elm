module Grids exposing (Grid, pretransformLines, resize, toggleLine, viewLines)

import Dials
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Scale, Transform, Transition(..))


type alias Grid a =
    { a
        | size : Size
        , margins : Int
        , valuesRange : Maybe XYRanges
        , pretransformScale : Scale
        , transform : Transform
        , lines : List Line
    }


pretransformLines : List Line -> ( List Line, Scale )
pretransformLines lines =
    let
        scale =
            case Lines.valuesRange lines of
                Just ( ( x1, x2 ), ( y1, y2 ) ) ->
                    ( 10000 / x2, 10000 / y2 )

                Nothing ->
                    ( 1, 1 )

        newLines =
            lines
                |> List.map (Lines.transform { scale = scale, translate = ( 0.0, 0.0 ) })
    in
    ( newLines, scale )


toggleLine : Grid a -> Int -> Grid a
toggleLine grid lineId =
    let
        toggle line =
            case line.id == lineId of
                True ->
                    { line | active = not line.active }

                False ->
                    line

        lines =
            List.map toggle grid.lines

        valuesRange =
            Lines.valuesRange <| List.filter .active lines
    in
    { grid
        | lines = lines
        , valuesRange = valuesRange
        , transform = Transforms.calcTransform grid.size valuesRange
    }


resize : Size -> Grid a -> Grid a
resize size grid =
    { grid
        | transform = Transforms.calcTransform size grid.valuesRange
        , size = size
    }



-- VIEW


viewLines : Grid a -> Svg msg
viewLines grid =
    grid.lines
        |> List.map (Lines.draw grid.transform grid.size)
        |> g []
        |> Transforms.transformGroup grid.transform Slow
