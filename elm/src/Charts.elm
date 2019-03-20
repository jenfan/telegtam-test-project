module Charts exposing (Chart, Msg, init, resize, update, view, viewLineBtn)

import Data
import Grids exposing (Grid)
import Html exposing (Html, button, div, text)
import Html.Attributes
import Html.Events exposing (onClick)
import Lines exposing (Line)
import Ranges exposing (Size)
import Svg.Attributes exposing (..)


type alias Chart =
    { size : Size
    , frame : Grid
    , map : Grid
    }


type Msg
    = ToggleLine Int


init : Size -> Chart
init size =
    let
        lines =
            Data.init
    in
    { size = size
    , frame = Grids.init { size = frameSize size, lines = lines, axes = True, margins = 10 }
    , map = Grids.init { size = mapSize size, lines = lines, axes = False, margins = 0 }
    }


frameSize : Size -> Size
frameSize size =
    Tuple.mapSecond (\x -> toFloat x * 0.4 |> round) size


mapSize : Size -> Size
mapSize size =
    Tuple.mapSecond (\x -> toFloat x * 0.04 |> round) size


update : Msg -> Chart -> Chart
update msg chart =
    case msg of
        ToggleLine id ->
            { chart
                | frame = Grids.toggleLine chart.frame id
                , map = Grids.toggleLine chart.map id
            }


resize : Chart -> Size -> Chart
resize chart size =
    { chart
        | frame = Grids.resize chart.frame (frameSize size)
        , map = Grids.resize chart.map (mapSize size)
        , size = size
    }


view : Chart -> Html Msg
view chart =
    div []
        [ Grids.view chart.frame
        , Grids.view chart.map
        , viewLineBtns chart.map.lines
        ]


viewLineBtns : List Line -> Html Msg
viewLineBtns lines =
    lines
        |> List.map viewLineBtn
        |> div []


viewLineBtn : Line -> Html Msg
viewLineBtn line =
    button
        [ onClick (ToggleLine line.id)
        , Html.Attributes.style "background-color" line.color
        , class "button"
        ]
        [ text <| Lines.title line ]
