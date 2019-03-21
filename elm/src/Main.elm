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
    = ChartMsg Charts.Msg
    | WindowResized Size


init : Size -> ( Chart, Cmd Msg )
init size =
    let
        ( chart, cmd ) =
            Charts.init size
    in
    ( chart, Cmd.map ChartMsg cmd )


view : Chart -> List (Html Msg)
view grid =
    [ Html.map ChartMsg (Charts.view grid)
    ]


update : Msg -> Chart -> ( Chart, Cmd Msg )
update msg chart =
    case msg of
        ChartMsg subMsg ->
            ( Charts.update subMsg chart, Cmd.none )

        WindowResized size ->
            ( Charts.resize chart size, Cmd.none )


port windResized : (Size -> msg) -> Sub msg


subscriptions : Sub Msg
subscriptions =
    Sub.batch
        [ windResized WindowResized
        , Sub.map ChartMsg Charts.subscriptions
        ]


main : Program Size Chart Msg
main =
    Browser.document
        { init = init
        , view =
            \grid ->
                { title = "Telegram test chart", body = view grid }
        , update = update
        , subscriptions = \_ -> subscriptions
        }
