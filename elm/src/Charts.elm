module Charts exposing (Chart, Msg, init, resize, subscriptions, update, view, viewLineBtn)

import Data
import Grids exposing (Grid)
import Grids.Frame as Frame exposing (Frame)
import Grids.Map as Map exposing (Map)
import Html exposing (Html, button, div, h1, span, text)
import Html.Attributes
import Lines exposing (Line)
import Ranges exposing (Size)
import Svg exposing (Svg, svg)
import Svg.Attributes exposing (..)
import Utils exposing (classList)


type alias Chart =
    { size : Size
    , frame : Frame
    , map : Map
    , id : Int
    }


type Msg
    = ToggleLine Int
    | MapMsg Int Map.Msg


init : Size -> List Chart
init size =
    let
        chartInit : Int -> List Line -> Chart
        chartInit id lines =
            let
                map =
                    Map.init
                        { size = mapSize size
                        , lines = lines
                        , margins = 20
                        , id = String.fromInt id
                        }

                frame =
                    Frame.init
                        { size = frameSize size
                        , lines = lines
                        , margins = 20
                        , id = String.fromInt id
                        , position = map.mapBox.position
                        }
            in
            { map = map
            , frame = frame
            , size = size
            , id = id
            }

        listLines =
            Data.init
    in
    listLines
        |> List.indexedMap chartInit


frameSize : Size -> Size
frameSize size =
    size
        |> Tuple.mapSecond (\y -> toFloat y * 0.5 |> round)


mapSize : Size -> Size
mapSize size =
    Tuple.mapSecond (\y -> toFloat y * 0.055 |> round) size


update : Msg -> Chart -> Chart
update msg chart =
    case msg of
        ToggleLine id ->
            { chart
                | frame = Grids.toggleLine chart.frame id
                , map = Grids.toggleLine chart.map id
            }

        MapMsg id subMsg ->
            if chart.id == id then
                let
                    map =
                        Map.update subMsg chart.map

                    frame =
                        Frame.updatePosition map.mapBox.position chart.frame
                in
                { chart | map = map, frame = frame }

            else
                chart


resize : Chart -> Size -> Chart
resize chart size =
    { chart
        | frame = Grids.resize (frameSize size) chart.frame
        , map = Map.resize (mapSize size) chart.map
        , size = size
    }


subscriptions : Chart -> Sub Msg
subscriptions chart =
    Sub.map (MapMsg chart.id) Map.subscriptions



-- VIEW


view : Chart -> Html Msg
view chart =
    div []
        [ h1 [ style "padding: 40px; font-size: 40pt" ] [ text <| "Chart " ++ String.fromInt chart.id ]
        , Frame.view chart.frame
        , Html.map (MapMsg chart.id) (Map.view chart.map)
        , viewLineBtns chart.map.lines
        ]


viewLineBtns : List Line -> Html Msg
viewLineBtns lines =
    lines
        |> List.map viewLineBtn
        |> div [ class "buttons" ]


viewLineBtn : Line -> Html Msg
viewLineBtn line =
    Lines.viewBtn ToggleLine line
