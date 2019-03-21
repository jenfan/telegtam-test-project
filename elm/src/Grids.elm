module Grids exposing (Grid, resize, toggleLine, viewLines)

import Dials
import Lines exposing (Line)
import MapBoxes exposing (MapBox)
import Ranges exposing (Range, Size, XY, XYRanges)
import Svg exposing (..)
import Svg.Attributes as Attr exposing (..)
import Transforms exposing (Transform)


type alias Grid =
    { size : Size
    , margins : Int
    , valuesRange : Maybe XYRanges
    , transform : Transform
    , lines : List Line
    , mapBox : Maybe MapBox
    }


toggleLine : Grid -> Int -> Grid
toggleLine grid lineId =
    let
        updateLine line =
            case line.id == lineId of
                True ->
                    { line | active = not line.active }

                False ->
                    line

        lines =
            List.map updateLine grid.lines

        valuesRange =
            Lines.valuesRange <| List.filter .active lines
    in
    { grid
        | lines = lines
        , valuesRange = valuesRange
        , transform = Transforms.calcTransform grid.size valuesRange
    }


resize : Size -> Grid -> Grid
resize size grid =
    { grid
        | transform = Transforms.calcTransform size grid.valuesRange
        , size = size
    }



-- VIEW


viewLines : Grid -> Svg msg
viewLines grid =
    grid.lines
        |> List.map (Lines.draw grid.transform grid.size)
        |> g []
        |> Transforms.transformGroup grid.transform
