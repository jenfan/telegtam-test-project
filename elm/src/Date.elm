module Date exposing (fromPosix)

import Derberos.Date.Core
import Time


fromPosix : Int -> String
fromPosix millisecond =
    let
        date =
            Time.millisToPosix millisecond
                |> Derberos.Date.Core.posixToCivil
    in
    monthString date.month ++ " " ++ String.fromInt date.day


monthString : Int -> String
monthString num =
    case num of
        1 ->
            "Jan"

        2 ->
            "Feb"

        3 ->
            "Mar"

        4 ->
            "Apr"

        5 ->
            "May"

        6 ->
            "Jun"

        7 ->
            "Jul"

        8 ->
            "Aug"

        9 ->
            "Sep"

        10 ->
            "Oct"

        11 ->
            "Nov"

        12 ->
            "Dec"

        _ ->
            ""
