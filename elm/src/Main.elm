module Main exposing (main)

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
    = GridMsg Grids.Msg



--| GotCharts (Result Http.Error Chart)


init : Size -> ( Grid, Cmd Msg )
init size =
    ( Charts.init |> Grids.init size, Cmd.none )



--loadCharts : Cmd Msg
--loadCharts =
--    Http.get
--        { url = Charts.chartsUrl
--        , expect = Http.expectJson GotCharts Charts.decoder
--        }


view : Grid -> List (Html Msg)
view grid =
    [ br [] []
    , br [] []
    , br [] []
    , Html.map GridMsg <| Grids.view grid
    , viewLineBtns grid.lines
    ]


viewLineBtns : List Line -> Html Msg
viewLineBtns lines =
    lines
        |> List.map Grids.viewLineBtn
        |> List.map (Html.map GridMsg)
        |> div []


update : Msg -> Grid -> ( Grid, Cmd Msg )
update msg grid =
    case msg of
        GridMsg subMsg ->
            let
                newGrid =
                    Grids.update subMsg grid
            in
            ( newGrid, Cmd.none )


subscriptions : Sub Msg
subscriptions =
    Sub.map GridMsg Grids.subscriptions



--GotCharts result ->
--    case result of
--        Ok chart ->
--            ( Grids.init chart, Cmd.none )


main : Program Size Grid Msg
main =
    Browser.document
        { init = init
        , view =
            \grid ->
                { title = "Telegram test chart", body = view grid }
        , update = update
        , subscriptions = \_ -> subscriptions
        }
