module Main exposing (main)

import Svg exposing (..)
import Svg.Attributes exposing (..)


main =
    svg
        [ width "100", height "100" ]
        [ circle [ cx "60", cy "60", r "30" ] []
        ]
