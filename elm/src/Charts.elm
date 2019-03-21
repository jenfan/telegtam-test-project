module Charts exposing (Chart, Msg, init, resize, subscriptions, update, view, viewLineBtn)

import Data
import Grids exposing (Grid)
import Grids.Frame as Frame
import Grids.Map as Map
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
    | MapMsg Map.Msg


init : Size -> ( Chart, Cmd Msg )
init size =
    let
        id =
            "123"

        lines =
            Data.init

        frame =
            Frame.init
                { size = frameSize size
                , lines = lines
                , margins = 10
                }

        ( map, cmd ) =
            Map.init
                { size = mapSize size
                , lines = lines
                , margins = 0
                , id = id
                }
    in
    ( { size = size
      , frame = frame
      , map = map
      }
    , Cmd.map MapMsg cmd
    )


frameSize : Size -> Size
frameSize size =
    size
        |> Tuple.mapSecond (\y -> toFloat y * 0.4 |> round)


mapSize : Size -> Size
mapSize size =
    Tuple.mapSecond (\y -> toFloat y * 0.04 |> round) size


update : Msg -> Chart -> Chart
update msg chart =
    case msg of
        ToggleLine id ->
            { chart
                | frame = Grids.toggleLine chart.frame id
                , map = Grids.toggleLine chart.map id
            }

        MapMsg subMsg ->
            { chart | map = Map.update subMsg chart.map }


resize : Chart -> Size -> Chart
resize chart size =
    { chart
        | frame = Grids.resize (frameSize size) chart.frame
        , map = Map.resize (mapSize size) chart.map
        , size = size
    }


subscriptions : Sub Msg
subscriptions =
    Sub.map MapMsg Map.subscriptions



-- VIEW


view : Chart -> Html Msg
view chart =
    div []
        [ Frame.view chart.frame
        , Html.map MapMsg (Map.view chart.map)
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
