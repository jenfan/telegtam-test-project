port module Main exposing (main)

import Browser exposing (..)
import Charts exposing (Chart)
import Grids exposing (Grid)
import Html exposing (Html, br, div)
import Http
import Lines exposing (Line)
import Points exposing (Point)
import Ranges exposing (Size)
import Svg exposing (..)
import Svg.Attributes exposing (..)


type Msg
    = ChartMsg Int Charts.Msg
    | WindowResized Size


init : Size -> ( List Chart, Cmd Msg )
init size =
    ( Charts.init size, Cmd.none )


view : List Chart -> List (Html Msg)
view charts =
    let
        viewChart chart =
            Html.map (ChartMsg chart.id) (Charts.view chart)
    in
    charts
        |> List.map viewChart


update : Msg -> List Chart -> ( List Chart, Cmd Msg )
update msg charts =
    case msg of
        ChartMsg id subMsg ->
            let
                updateChart chart =
                    if chart.id == id then
                        Charts.update subMsg chart

                    else
                        chart
            in
            ( List.map updateChart charts, Cmd.none )

        WindowResized size ->
            let
                updateChart chart =
                    Charts.resize chart size
            in
            ( List.map updateChart charts, Cmd.none )


port windResized : (Size -> msg) -> Sub msg


subscriptions : List Chart -> Sub Msg
subscriptions charts =
    let
        chartSub chart =
            Sub.map (ChartMsg chart.id) (Charts.subscriptions chart)
    in
    Sub.batch
        [ windResized WindowResized
        , Sub.batch (List.map chartSub charts)
        ]


main : Program Size (List Chart) Msg
main =
    Browser.document
        { init = init
        , view =
            \grid ->
                { title = "Telegram test chart", body = view grid }
        , update = update
        , subscriptions = subscriptions
        }
