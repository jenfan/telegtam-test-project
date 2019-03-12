module Main exposing (main)

import Browser exposing (..)
import Data exposing (initModels)
import Grids exposing (Grid)
import Html exposing (Html, br, div)
import Lines exposing (Line)
import Points exposing (Point)
import Svg exposing (..)
import Svg.Attributes exposing (..)


type Msg
    = GridMsg Grids.Msg


init : () -> ( Grid, Cmd Msg )
init _ =
    ( Grids.init ( 100, 100 ) initModels, Cmd.none )


view : Grid -> List (Html Msg)
view grid =
    [ br [] []
    , br [] []
    , br [] []
    , Html.map GridMsg <| Grids.view grid
    , viewLineButtons grid.lines
    ]


viewLineButtons : List Line -> Html Msg
viewLineButtons lines =
    lines
        |> List.map Grids.viewLineButton
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


subscriptions : Grid -> Sub Msg
subscriptions grid =
    Sub.none


main : Program () Grid Msg
main =
    Browser.document
        { init = init
        , view =
            \grid ->
                { title = "Telegram test chart", body = view grid }
        , update = update
        , subscriptions = subscriptions
        }
