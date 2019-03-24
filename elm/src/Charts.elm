module Charts exposing (Chart, Msg, init, resize, subscriptions, update, view, viewLineBtn)

import Data
import Grids exposing (Grid)
import Grids.Frame as Frame exposing (Frame)
import Grids.Map as Map exposing (Map)
import Html exposing (Html, button, div, span, text)
import Html.Attributes
import Html.Events exposing (onClick)
import Lines exposing (Line)
import Ranges exposing (Size)
import Svg exposing (Svg, svg)
import Svg.Attributes exposing (..)
import Utils exposing (classList)


type alias Chart =
    { size : Size
    , frame : Frame
    , map : Map
    }


type Msg
    = ToggleLine Int
    | MapMsg Map.Msg


init : Size -> Chart
init size =
    let
        id =
            "123"

        lines =
            Data.init

        map =
            Map.init
                { size = mapSize size
                , lines = lines
                , margins = 20
                , id = id
                }

        frame =
            Frame.init
                { size = frameSize size
                , lines = lines
                , margins = 20
                , id = id
                , position = map.mapBox.position
                }
    in
    { size = size
    , frame = frame
    , map = map
    }


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

        MapMsg subMsg ->
            let
                map =
                    Map.update subMsg chart.map

                frame =
                    Frame.updatePosition map.mapBox.position chart.frame
            in
            { chart | map = map, frame = frame }


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
        , classList [ ( "active", line.active ) ]
        ]
        [ div
            [ style <| "border: 8px solid " ++ line.color
            , style <| "background-color: " ++ line.color
            , class "circle"
            , width "300px"
            , height "300px"
            ]
            [ galka ]
        , span [] [ Html.text line.title ]
        ]


galka =
    svg
        [ height "45"
        , width "45"
        , viewBox "0 0 159.67 125.84"
        ]
        [ Svg.path [ fill "#fff", stroke "none", d "M154.22,5.45h0a18.31,18.31,0,0,0-25.82,0L52.23,81.62l-20.95-21a18.32,18.32,0,0,0-25.83,0h0a18.32,18.32,0,0,0,0,25.83l33,33c.26.3.54.6.83.89h0a18.31,18.31,0,0,0,25.82,0l89.11-89.11A18.31,18.31,0,0,0,154.22,5.45Z" ] []
        ]
