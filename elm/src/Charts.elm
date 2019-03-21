module Charts exposing (Chart, Msg, init, resize, subscriptions, update, view, viewLineBtn)

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
    | GridsMsg Grids.Msg


init : Size -> ( Chart, Cmd Msg )
init size =
    let
        id =
            "123"

        lines =
            Data.init

        ( frame, _ ) =
            Grids.init
                { size = frameSize size
                , lines = lines
                , mainFrame = True
                , margins = 10
                , id = id
                }

        ( map, cmd ) =
            Grids.init
                { size = mapSize size
                , lines = lines
                , mainFrame = False
                , margins = 0
                , id = id
                }
    in
    ( { size = size
      , frame = frame
      , map = map
      }
    , Cmd.map GridsMsg cmd
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

        GridsMsg subMsg ->
            { chart | map = Grids.update subMsg chart.map }


resize : Chart -> Size -> Chart
resize chart size =
    { chart
        | frame = Grids.resize chart.frame (frameSize size)
        , map = Grids.resize chart.map (mapSize size)
        , size = size
    }


subscriptions : Sub Msg
subscriptions =
    Sub.map GridsMsg Grids.subscriptions



-- VIEW


view : Chart -> Html Msg
view chart =
    div []
        [ Html.map GridsMsg (Grids.view chart.frame)
        , Html.map GridsMsg (Grids.view chart.map)
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
