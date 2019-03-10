module Main exposing (main)

import Grids
import Lines exposing (Line, initModel1, initModel2)
import Points exposing (Point, new)
import Svg exposing (..)
import Svg.Attributes exposing (..)


main : Svg msg
main =
    Grids.init 500 500 [ initModel1, initModel2 ]
        |> Grids.view
