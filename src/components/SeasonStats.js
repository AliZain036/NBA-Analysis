import React, { useEffect, useState } from "react"
import { Input, Button, Spin, Table, Collapse } from "antd"
import axios from "redaxios"
import moment from "moment"

const SeasonStats = () => {
  useEffect(() => {
    // fetchCurrentSeasonDetails()
    // fetchPlayerSeasonDetails()
    getSchedules()
    getPlayerSeasonStats()
    fetchPlayerGameData()
    fetchPlayerSeasonData()
  }, [])

  const [lastTenGamesData, setLastTenGamesData] = useState([])
  const [lastTenGamesWorstRankedPlayers, setLastTenGamesWorstRankedPlayers] =
    useState([])
  const [lastTenGamesTopRankedPlayers, setLastTenGamesTopRankedPlayers] =
    useState([])
  const [playersMedian, setPlayersMedian] = useState(null)
  const [playersMode, setPlayersMode] = useState(null)
  const [minimumStatsValue, setMinimumStatsValue] = useState(null)
  const [rangeStatsValue, setRangeStatsValue] = useState(null)
  const [maximumStatsValue, setMaximumStatsValue] = useState(null)

  const [playerGameData, setPlayerGameData] = useState([])
  const [playerSeasonData, setPlayerSeasonData] = useState([])
  const [playerSeasonStatsByMin, setPlayerSeasonStatsByMin] = useState({})
  const [playerSeasonStatsByMax, setPlayerSeasonStatsByMax] = useState({})

  const fetchPlayerSeasonData = async () => {
    try {
      const response = await axios.get(
        `http://54.88.53.54:8080/playerSeasonData`
      )
      let data = [...response.data.data]
      setPlayerSeasonData(data)
      setPlayerSeasonStatsByMin((prev) => ({
        ...prev,
        playerSeasonMinByPoints: [...data]?.sort((a, b) => a.Points - b.Points),
        playerSeasonMinByThreePointersMade: [...data]?.sort(
          (a, b) => a.ThreePointersMade - b.ThreePointersMade
        ),
        playerSeasonMinByFreeThrowsMade: [...data]?.sort(
          (a, b) => a.FreeThrowsMade - b.FreeThrowsMade
        ),
        playerSeasonMinByAssists: [...data]?.sort(
          (a, b) => a.Assists - b.Assists
        ),
        playerSeasonMinByRebounds: [...data]?.sort(
          (a, b) => a.Rebounds - b.Rebounds
        ),
        playerSeasonMinByPersonalFouls: [...data]?.sort(
          (a, b) => a.PersonalFouls - b.PersonalFouls
        ),
        playerSeasonMinByBlockedShots: [...data]?.sort(
          (a, b) => a.BlockedShots - b.BlockedShots
        ),
        playerSeasonMinBySteals: [...data]?.sort((a, b) => a.Steals - b.Steals),
      }))
      setPlayerSeasonStatsByMax((prev) => ({
        ...prev,
        playerSeasonMaxByPoints: [...data]?.sort((a, b) => b.Points - a.Points),
        playerSeasonMaxByThreePointersMade: [...data]?.sort(
          (a, b) => b.ThreePointersMade - a.ThreePointersMade
        ),
        playerSeasonMaxByFreeThrowsMade: [...data]?.sort(
          (a, b) => b.FreeThrowsMade - a.FreeThrowsMade
        ),
        playerSeasonMaxByAssists: [...data]?.sort(
          (a, b) => b.Assists - a.Assists
        ),
        playerSeasonMaxByRebounds: [...data]?.sort(
          (a, b) => b.Rebounds - a.Rebounds
        ),
        playerSeasonMaxByPersonalFouls: [...data]?.sort(
          (a, b) => b.PersonalFouls - a.PersonalFouls
        ),
        playerSeasonMaxByBlockedShots: [...data]?.sort(
          (a, b) => b.BlockedShots - a.BlockedShots
        ),
        playerSeasonMaxBySteals: [...data]?.sort((a, b) => b.Steals - a.Steals),
      }))
    } catch (error) {
      console.error(error)
    }
  }

  console.log({ playerSeasonStatsByMin, lastTenGamesData })

  const [playersGeomeanData, setplayersGeomeanData] = useState([])

  const [playerSeasonStatsData, setPlayerSeasonStatsData] = useState([])
  const [playerSeasonStatsAvgData, setPlayerSeasonStatsAvgData] = useState([])
  const [seasonTopRankedPlayersByPoints, setSeasonTopRankedPlayersByPoints] =
    useState([])
  const [
    seasonTopRankedPlayersByThreePointsMade,
    setSeasonTopRankedPlayersByThreePointsMade,
  ] = useState([])
  const [
    seasonTopRankedPlayersByFreeThrowsMade,
    setSeasonTopRankedPlayersByFreeThrowsMade,
  ] = useState([])
  const [seasonTopRankedPlayersByAssists, setSeasonTopRankedPlayersByAssists] =
    useState([])
  const [
    seasonTopRankedPlayersByRebounds,
    setSeasonTopRankedPlayersByRebounds,
  ] = useState([])
  const [
    seasonTopRankedPlayersByPersonalFouls,
    setSeasonTopRankedPlayersByPersonalFouls,
  ] = useState([])
  const [seasonTopRankedPlayersByBlocks, setSeasonTopRankedPlayersByBlocks] =
    useState([])
  const [seasonTopRankedPlayersBySteals, setSeasonTopRankedPlayersBySteals] =
    useState([])
  const [
    seasonWorstRankedPlayersByPoints,
    setSeasonWorstRankedPlayersByPoints,
  ] = useState([])
  const [
    seasonWorstRankedPlayersByThreePointsMade,
    setSeasonWorstRankedPlayersByThreePointsMade,
  ] = useState([])
  const [
    seasonWorstRankedPlayersByFreeThrowsMade,
    setSeasonWorstRankedPlayersByFreeThrowsMade,
  ] = useState([])
  const [
    seasonWorstRankedPlayersByAssists,
    setSeasonWorstRankedPlayersByAssists,
  ] = useState([])
  const [
    seasonWorstRankedPlayersByRebounds,
    setSeasonWorstRankedPlayersByRebounds,
  ] = useState([])
  const [
    seasonWorstRankedPlayersByPersonalFouls,
    setSeasonWorstRankedPlayersByPersonalFouls,
  ] = useState([])
  const [
    seasonWorstRankedPlayersByBlocks,
    setSeasonWorstRankedPlayersByBlocks,
  ] = useState([])
  const [
    seasonWorstRankedPlayersBySteals,
    setSeasonWorstRankedPlayersBySteals,
  ] = useState([])

  const fetchPlayerGameData = async () => {
    // try {
    //   const result = await fetch("http://localhost:8080/seasonMedianByPlayer")
    //   console.log({ result })
    // } catch (error) {
    //   console.error(error)
    // }
  }

  const getPlayerSeasonStats = async () => {
    try {
      const response = await axios.get(
        `http://54.88.53.54:8080/playerSeasonStats/${seasonYear}`,
        { headers: { Origin: "*" } }
      )
      let tempData = []
      setPlayerSeasonStatsData(response.data)
      response.data.forEach((item) => {
        tempData?.push({
          ...item,
          Points: (item.Points / item.Games).toFixed(2),
          ThreePointersMade: (item.ThreePointersMade / item.Games).toFixed(2),
          FreeThrowsMade: (item.FreeThrowsMade / item.Games).toFixed(2),
          Assists: (item.Assists / item.Games).toFixed(2),
          Rebounds: (item.Rebounds / item.Games).toFixed(2),
          PersonalFouls: (item.PersonalFouls / item.Games).toFixed(2),
          BlockedShots: (item.BlockedShots / item.Games).toFixed(2),
          Steals: (item.Steals / item.Games).toFixed(2),
        })
      })
      const seasonWorstRankedPlayersByPoints = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.Points - b.Points)
        .slice(0, 50)
      setSeasonWorstRankedPlayersByPoints(seasonWorstRankedPlayersByPoints)
      const seasonWorstRankedPlayersByThreePointsMade = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.ThreePointersMade - b.ThreePointersMade)
        .slice(0, 50)
      setSeasonWorstRankedPlayersByThreePointsMade(
        seasonWorstRankedPlayersByThreePointsMade
      )
      const seasonWorstRankedPlayersByFreeThrowsMade = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.FreeThrowsMade - b.FreeThrowsMade)
        .slice(0, 50)
      setSeasonWorstRankedPlayersByFreeThrowsMade(
        seasonWorstRankedPlayersByFreeThrowsMade
      )
      const seasonWorstRankedPlayersByAssists = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.Assists - b.Assists)
        .slice(0, 50)
      setSeasonWorstRankedPlayersByAssists(seasonWorstRankedPlayersByAssists)
      const seasonWorstRankedPlayersByRebounds = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.Rebounds - b.Rebounds)
        .slice(0, 50)
      setSeasonWorstRankedPlayersByRebounds(seasonWorstRankedPlayersByRebounds)
      const seasonWorstRankedPlayersByPersonalFouls = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.PersonalFouls - b.PersonalFouls)
        .slice(0, 50)
      setSeasonWorstRankedPlayersByPersonalFouls(
        seasonWorstRankedPlayersByPersonalFouls
      )
      const seasonWorstRankedPlayersByBlocks = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.BlockedShots - b.BlockedShots)
        .slice(0, 50)
      setSeasonWorstRankedPlayersByBlocks(seasonWorstRankedPlayersByBlocks)
      const seasonWorstRankedPlayersBySteals = [...response.data]
        .filter((item) => item.Minutes / item.Games >= 20)
        .sort((a, b) => a.Steals - b.Steals)
        .slice(0, 50)
      setSeasonWorstRankedPlayersBySteals(seasonWorstRankedPlayersBySteals)
      const sortByPoints = [...response.data]
      setSeasonTopRankedPlayersByPoints(
        sortByPoints.sort((a, b) => b.Points - a.Points).slice(0, 50)
      )
      const sortByThreePointersMade = [...response.data]
      setSeasonTopRankedPlayersByThreePointsMade(
        sortByThreePointersMade
          .sort((a, b) => b.ThreePointersMade - a.ThreePointersMade)
          .slice(0, 50)
      )
      const sortByFreeThrowsMade = [...response.data]
      setSeasonTopRankedPlayersByFreeThrowsMade(
        sortByFreeThrowsMade
          .sort((a, b) => b.FreeThrowsMade - a.FreeThrowsMade)
          .slice(0, 50)
      )
      const sortByAssists = [...response.data]
      setSeasonTopRankedPlayersByAssists(
        sortByAssists.sort((a, b) => b.Assists - a.Assists).slice(0, 50)
      )
      const sortByRebounds = [...response.data]
      setSeasonTopRankedPlayersByRebounds(
        sortByRebounds.sort((a, b) => b.Rebounds - a.Rebounds).slice(0, 50)
      )
      const sortByPersonalFouls = [...response.data]
      setSeasonTopRankedPlayersByPersonalFouls(
        sortByPersonalFouls
          .sort((a, b) => b.PersonalFouls - a.PersonalFouls)
          .slice(0, 50)
      )
      const sortByBlockedShots = [...response.data]
      setSeasonTopRankedPlayersByBlocks(
        sortByBlockedShots
          .sort((a, b) => b.BlockedShots - a.BlockedShots)
          .slice(0, 50)
      )
      const sortBySteals = [...response.data]
      setSeasonTopRankedPlayersBySteals(
        sortBySteals.sort((a, b) => b.Steals - a.Steals).slice(0, 50)
      )
      // setSeasonTopRankedPlayersData((prev) => ({
      //   ...prev,
      //   Points: sortByPoints?.slice(0, 50),
      //   ThreePointersMade: sortByThreePointersMade?.slice(0, 50),
      //   FreeThrowsMade: sortByFreeThrowsMade?.slice(0, 50),
      //   Assists: sortByAssists?.slice(0, 50),
      //   Rebounds: sortByRebounds?.slice(0, 50),
      //   PersonalFouls: sortByPersonalFouls?.slice(0, 50),
      //   BlockedShots: sortByBlockedShots?.slice(0, 50),
      //   Steals: sortBySteals?.slice(0, 50),
      // }))
      setPlayerSeasonStatsAvgData(tempData)
    } catch (error) {
      console.error(error)
    }
  }

  const [searchText, setSearchText] = useState("")

  const playerSeasonStatsTableColumn = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      sorter: (a, b) => a.Name.localeCompare(b.Name),
      filteredValue: searchText || null,
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
      sorter: (a, b) => a.Team.localeCompare(b.Team),
    },
    {
      title: "TeamID",
      dataIndex: "TeamID",
      key: "TeamID",
    },
    {
      title: "Position",
      dataIndex: "Position",
      sorter: (a, b) => a.Position.localeCompare(b.Position),
      key: "Position",
    },
    {
      title: "Games Played",
      dataIndex: "gamesPlayed",
      key: "gamesPlayed",
      sorter: (a, b) => a.gamesPlayed - b.gamesPlayed,
      render: (gamesPlayed, record) => {
        return <p>{gamesPlayed}</p>
      },
    },
    {
      title: "Points",
      dataIndex: "Points",
      key: "Points",
      sorter: (a, b) => a.Points - b.Points,
      render: (points, record) => <p>{points || 0}</p>,
    },
    {
      title: "3 Pointers",
      dataIndex: "ThreePointersMade",
      key: "ThreePointersMade",
      sorter: (a, b) => a.ThreePointersMade - b.ThreePointersMade,
    },
    {
      title: "FT Made",
      dataIndex: "FreeThrowsMade",
      key: "FreeThrowsMade",
      sorter: (a, b) => a.FreeThrowsMade - b.FreeThrowsMade,
    },
    {
      title: "Assists",
      dataIndex: "Assists",
      key: "Assists",
      sorter: (a, b) => a.Assists - b.Assists,
    },
    {
      title: "Rebounds",
      dataIndex: "Rebounds",
      key: "Rebounds",
      sorter: (a, b) => a.Rebounds - b.Rebounds,
    },
    {
      title: "Personal Fouls",
      dataIndex: "PersonalFouls",
      key: "PersonalFouls",
      sorter: (a, b) => a.PersonalFouls - b.PersonalFouls,
    },
    {
      title: "Blocks",
      dataIndex: "BlockedShots",
      key: "BlockedShots",
      sorter: (a, b) => a.BlockedShots - b.BlockedShots,
    },
    {
      title: "Steals",
      dataIndex: "Steals",
      key: "Steals",
      sorter: (a, b) => a.Steals - b.Steals,
    },
  ]

  const getSchedules = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `http://54.88.53.54:8080/schedules/${seasonYear}post`,
        { headers: { Origin: "*" } }
      )
      // const sortedData = res.data.reverse()
      let teams = [
        "ATL",
        "BKN",
        "BOS",
        "CHA",
        "CHI",
        "CLE",
        "DAL",
        "DEN",
        "DET",
        "GS",
        "HOU",
        "IND",
        "LAC",
        "LAL",
        "MEM",
        "MIA",
        "MIL",
        "MIN",
        "NO",
        "NY",
        "OKC",
        "ORL",
        "PHI",
        "PHO",
        "POR",
        "SA",
        "SAC",
        "TOR",
        "UTA",
        "WAS",
      ]
      let teamsData = []
      teams.forEach((team, index) => {
        let filteredData = res.data.filter(
          (item, ind) =>
            (item.AwayTeam == team || item.HomeTeam == team) &&
            item.SeasonType === 3
        )
        teamsData.push(filteredData.slice(0, 10))
      })
      if (teamsData?.length < 10) {
        const res = await axios.get(
          `http://54.88.53.54:8080/schedules/${seasonYear}`,
          { headers: { Origin: "*" } }
        )
        teams.forEach((team, index) => {
          let filteredData = res.data.filter(
            (item, ind) => item.AwayTeam == team || item.HomeTeam == team
          )
          if (teamsData?.length < 10) {
            let remainingItems = 10 - teamsData?.length
            teamsData.push(filteredData.slice(0, remainingItems))
          }
        })
      }
      teamsData = teamsData.flat()
      let gamesData = []
      teamsData.map((team, index) => {
        let item = gamesData.find((el) => el.Day === team.Day)
        if (!item) {
          gamesData.push(team)
        }
      })
      gamesData = gamesData.slice(0, 10)
      console.log({ gamesData })
      let tenGamesData = gamesData
      const promises = []
      tenGamesData.forEach((item, index) => {
        let date = moment(item.Day).format("YYYY-MMM-DD")
        let gameId = item.GameID
        console.log({ date })
        const promise = axios.get(
          `http://54.88.53.54:8080/PlayerGameStatsByDate/${date}`
        )
        promises.push(promise)
      })
      const promisesRes = await Promise.all(promises)
      // getPlayerGameStatsByDate(date)
      if (promisesRes) {
        const response = promisesRes.map((res) => res.data)
        setLastTenGamesData(response)
        const groupedPlayers = groupPlayersByPlayerID(response)
        calculateMedian(groupedPlayers)
        calculateMode(groupedPlayers)
        calculateGeoMean(groupedPlayers)
        calculateAvg(groupedPlayers)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const [playerSeasonStats, setPlayerSeasonStats] = useState([])

  const calculateGeoMean = (groupedPlayers = []) => {
    let playersGeoMeanData = []
    groupedPlayers.forEach((player = []) => {
      let pointsProduct = 1
      let threePointersMadeProduct = 1
      let freeThrowsMadeProduct = 1
      let assistsProduct = 1
      let reboundsProduct = 1
      let personalFoulsProduct = 1
      let blockedShotsFoulsProduct = 1
      let stealsProduct = 1
      player.forEach((item) => {
        pointsProduct *= item.Points
        threePointersMadeProduct *= item.ThreePointersMade
        freeThrowsMadeProduct *= item.FreeThrowsMade
        assistsProduct *= item.Assists
        reboundsProduct *= item.Rebounds
        personalFoulsProduct *= item.PersonalFouls
        blockedShotsFoulsProduct *= item.BlockedShots
        stealsProduct *= item.Steals
      })
      const pointsGeoMean = Math.pow(pointsProduct, 1 / player.length)
      const threePointersMadeGeoMean = Math.pow(
        threePointersMadeProduct,
        1 / player.length
      )
      const freeThrowsMadeGeoMean = Math.pow(
        freeThrowsMadeProduct,
        1 / player.length
      )
      const assistsGeoMean = Math.pow(assistsProduct, 1 / player.length)
      const reboundsGeoMean = Math.pow(reboundsProduct, 1 / player.length)
      const personalFoulsGeoMean = Math.pow(
        personalFoulsProduct,
        1 / player.length
      )
      const blockedShotsGeoMean = Math.pow(
        blockedShotsFoulsProduct,
        1 / player.length
      )
      const stealsGeoMean = Math.pow(stealsProduct, 1 / player.length)

      playersGeoMeanData.push({
        ...player[0],
        Points: pointsGeoMean.toFixed(2),
        ThreePointersMade: threePointersMadeGeoMean.toFixed(2),
        FreeThrowsMade: freeThrowsMadeGeoMean.toFixed(2),
        Assists: assistsGeoMean.toFixed(2),
        Rebounds: reboundsGeoMean.toFixed(2),
        PersonalFouls: personalFoulsGeoMean.toFixed(2),
        BlockedShots: blockedShotsGeoMean.toFixed(2),
        Steals: stealsGeoMean.toFixed(2),
      })
    })
    console.log({ playersGeoMeanData })
    setplayersGeomeanData(playersGeoMeanData)
  }

  function groupPlayersByPlayerID(arrays) {
    const result = []
    const players = {}
    for (const array of arrays) {
      for (const player of array) {
        const playerID = player.PlayerID
        if (!players[playerID]) {
          players[playerID] = []
        } else {
          // console.log(players[playerID])
        }
        if (player.Games === 1) {
          players[playerID].push(player)
        }
      }
    }
    for (const playerID in players) {
      result.push(players[playerID])
    }
    return result
  }

  const calculateAvg = async (playerDataForLastTenGames) => {
    const temp = []

    // Calculate Points average for each player
    playerDataForLastTenGames?.map((playerArr, index) => {
      const avg = 0
      const result = playerArr.reduce(
        (accumulator, currentObject) => {
          if (currentObject.PlayerID === accumulator.PlayerID) {
            accumulator.Points += currentObject.Points
            accumulator.ThreePointersMade += currentObject.ThreePointersMade
            accumulator.FreeThrowsMade += currentObject.FreeThrowsMade
            accumulator.Assists += currentObject.Assists
            accumulator.Rebounds += currentObject.Rebounds
            accumulator.PersonalFouls += currentObject.PersonalFouls
            accumulator.BlockedShots += currentObject.BlockedShots
            accumulator.Steals += currentObject.Steals
            accumulator.Count++
          } else {
            accumulator = {
              PlayerID: currentObject.PlayerID,
              Points: currentObject.Points,
              ThreePointersMade: currentObject.ThreePointersMade,
              FreeThrowsMade: currentObject.FreeThrowsMade,
              Assists: currentObject.Assists,
              Rebounds: currentObject.Rebounds,
              PersonalFouls: currentObject.PersonalFouls,
              BlockedShots: currentObject.BlockedShots,
              Steals: currentObject.Steals,
              Count: 1,
            }
          }
          return accumulator
        },
        {
          PlayerID: playerArr[0]?.PlayerID,
          Points: playerArr[0]?.Points,
          ThreePointersMade: playerArr[0]?.ThreePointersMade,
          FreeThrowsMade: playerArr[0]?.FreeThrowsMade,
          Assists: playerArr[0]?.Assists,
          Rebounds: playerArr[0]?.Rebounds,
          PersonalFouls: playerArr[0]?.PersonalFouls,
          BlockedShots: playerArr[0]?.BlockedShots,
          Steals: playerArr[0]?.Steals,
          Count: 0,
        }
      )

      const PointsAverage = result.Points / result.Count || 0
      const ThreePointersMadeAverage =
        result.ThreePointersMade / result.Count || 0
      const FreeThrowsMadeAverage = result.FreeThrowsMade / result.Count || 0
      const AssistsAverage = result.Assists / result.Count || 0
      const ReboundsAverage = result.Rebounds / result.Count || 0
      const PersonalFoulsAverage = result.PersonalFouls / result.Count || 0
      const BlockedShotsAverage = result.BlockedShots / result.Count || 0
      const StealsAverage = result.Steals / result.Count || 0

      const gamesPlayed = playerArr.reduce((acc, player) => {
        if (player.Games === 1) {
          return acc + 1
        } else {
          return acc
        }
      }, 0)

      // Create object with calculated average for requireed fields and push it in array to show in the table
      const playerWithAveragePoints = {
        ...playerArr[0],
        Points: PointsAverage.toFixed(2),
        ThreePointersMade: ThreePointersMadeAverage.toFixed(2),
        FreeThrowsMade: FreeThrowsMadeAverage.toFixed(2),
        Assists: AssistsAverage.toFixed(2),
        Rebounds: ReboundsAverage.toFixed(2),
        PersonalFouls: PersonalFoulsAverage.toFixed(2),
        BlockedShots: BlockedShotsAverage.toFixed(2),
        Steals: StealsAverage.toFixed(2),
        gamesPlayed: gamesPlayed,
      }
      temp.push(playerWithAveragePoints)
    })
    setLastTenGamesWorstRankedPlayers((prev) => ({
      ...prev,
      Points: [...temp].sort((a, b) => a.Points - b.Points).slice(0, 50),
      ThreePointersMade: [...temp]
        .sort((a, b) => a.ThreePointersMade - b.ThreePointersMade)
        .slice(0, 50),
      FreeThrowsMade: [...temp]
        .sort((a, b) => a.FreeThrowsMade - b.FreeThrowsMade)
        .slice(0, 50),
      Assists: [...temp].sort((a, b) => a.Assists - b.Assists).slice(0, 50),
      Rebounds: [...temp].sort((a, b) => a.Rebounds - b.Rebounds).slice(0, 50),
      PersonalFouls: [...temp]
        .sort((a, b) => a.PersonalFouls - b.PersonalFouls)
        .slice(0, 50),
      BlockedShots: [...temp]
        .sort((a, b) => a.BlockedShots - b.BlockedShots)
        .slice(0, 50),
      Steals: [...temp].sort((a, b) => a.Steals - b.Steals).slice(0, 50),
    }))
    setLastTenGamesTopRankedPlayers((prev) => ({
      ...prev,
      Points: [...temp].sort((a, b) => b.Points - a.Points).slice(0, 50),
      ThreePointersMade: [...temp]
        .sort((a, b) => b.ThreePointersMade - a.ThreePointersMade)
        .slice(0, 50),
      FreeThrowsMade: [...temp]
        .sort((a, b) => b.FreeThrowsMade - a.FreeThrowsMade)
        .slice(0, 50),
      Assists: [...temp].sort((a, b) => b.Assists - a.Assists).slice(0, 50),
      Rebounds: [...temp].sort((a, b) => b.Rebounds - a.Rebounds).slice(0, 50),
      PersonalFouls: [...temp]
        .sort((a, b) => b.PersonalFouls - a.PersonalFouls)
        .slice(0, 50),
      BlockedShots: [...temp]
        .sort((a, b) => b.BlockedShots - a.BlockedShots)
        .slice(0, 50),
      Steals: [...temp].sort((a, b) => b.Steals - a.Steals).slice(0, 50),
    }))
    setPlayerSeasonStats(temp)
    setLoading(false)
  }

  const calculateMode = (playerDataForLastTenGames) => {
    const temp = []
    playerDataForLastTenGames?.forEach((playerData, index) => {
      const pointsMap = playerData.reduce((map, player) => {
        const points = player.Points
        if (points in map) {
          map[points]++
        } else {
          map[points] = 1
        }
        return map
      }, {})

      const sortedEntries = Object.entries(pointsMap).sort(
        (a, b) => b[1] - a[1]
      )
      const modes = sortedEntries
        .filter((entry) => entry[1] === sortedEntries[0][1])
        .map((entry) => entry[0])

      const threePointersMadeMap = playerData.reduce((map, player) => {
        const ThreePointersMade = player.ThreePointersMade
        if (ThreePointersMade in map) {
          map[ThreePointersMade]++
        } else {
          map[ThreePointersMade] = 1
        }
        return map
      }, {})
      const ThreePointersMadeSortedEntries = Object.entries(
        threePointersMadeMap
      ).sort((a, b) => b[1] - a[1])
      const ThreePointersMadeModes = ThreePointersMadeSortedEntries.filter(
        (entry) => entry[1] === ThreePointersMadeSortedEntries[0][1]
      ).map((entry) => entry[0])

      const FreeThrowsMadeMap = playerData.reduce((map, player) => {
        const FreeThrowsMade = player.FreeThrowsMade
        if (FreeThrowsMade in map) {
          map[FreeThrowsMade]++
        } else {
          map[FreeThrowsMade] = 1
        }
        return map
      }, {})
      const FreeThrowsMadeSortedEntries = Object.entries(
        FreeThrowsMadeMap
      ).sort((a, b) => b[1] - a[1])
      const FreeThrowsMadeModes = FreeThrowsMadeSortedEntries.filter(
        (entry) => entry[1] === FreeThrowsMadeSortedEntries[0][1]
      ).map((entry) => entry[0])

      const AssistsMap = playerData.reduce((map, player) => {
        const Assists = player.Assists
        if (Assists in map) {
          map[Assists]++
        } else {
          map[Assists] = 1
        }
        return map
      }, {})
      const AssistsSortedEntries = Object.entries(AssistsMap).sort(
        (a, b) => b[1] - a[1]
      )
      const AssistsModes = AssistsSortedEntries.filter(
        (entry) => entry[1] === AssistsSortedEntries[0][1]
      ).map((entry) => entry[0])

      const ReboundsMap = playerData.reduce((map, player) => {
        const Rebounds = player.Rebounds
        if (Rebounds in map) {
          map[Rebounds]++
        } else {
          map[Rebounds] = 1
        }
        return map
      }, {})
      const ReboundsSortedEntries = Object.entries(ReboundsMap).sort(
        (a, b) => b[1] - a[1]
      )
      const ReboundsModes = ReboundsSortedEntries.filter(
        (entry) => entry[1] === ReboundsSortedEntries[0][1]
      ).map((entry) => entry[0])

      const PersonalFoulsMap = playerData.reduce((map, player) => {
        const PersonalFouls = player.PersonalFouls
        if (PersonalFouls in map) {
          map[PersonalFouls]++
        } else {
          map[PersonalFouls] = 1
        }
        return map
      }, {})
      const PersonalFoulsSortedEntries = Object.entries(PersonalFoulsMap).sort(
        (a, b) => b[1] - a[1]
      )
      const PersonalFoulsModes = PersonalFoulsSortedEntries.filter(
        (entry) => entry[1] === PersonalFoulsSortedEntries[0][1]
      ).map((entry) => entry[0])

      const BlockedShotsMap = playerData.reduce((map, player) => {
        const BlockedShots = player.BlockedShots
        if (BlockedShots in map) {
          map[BlockedShots]++
        } else {
          map[BlockedShots] = 1
        }
        return map
      }, {})
      const BlockedShotsSortedEntries = Object.entries(BlockedShotsMap).sort(
        (a, b) => b[1] - a[1]
      )
      const BlockedShotsModes = BlockedShotsSortedEntries.filter(
        (entry) => entry[1] === BlockedShotsSortedEntries[0][1]
      ).map((entry) => entry[0])

      const StealsMap = playerData.reduce((map, player) => {
        const Steals = player.Steals
        if (Steals in map) {
          map[Steals]++
        } else {
          map[Steals] = 1
        }
        return map
      }, {})
      const StealsSortedEntries = Object.entries(StealsMap).sort(
        (a, b) => b[1] - a[1]
      )
      const StealsModes = StealsSortedEntries.filter(
        (entry) => entry[1] === StealsSortedEntries[0][1]
      ).map((entry) => entry[0])

      temp.push({
        ...playerData[0],
        Points: modes[0],
        ThreePointersMade: ThreePointersMadeModes[0],
        FreeThrowsMade: FreeThrowsMadeModes[0],
        Assists: AssistsModes[0],
        Rebounds: ReboundsModes[0],
        PersonalFouls: PersonalFoulsModes[0],
        BlockedShots: BlockedShotsModes[0],
        Steals: StealsModes[0],
      })
      // console.log(`ThreePointersMadeModes points: ${ThreePointersMadeModes}`)
      // console.log(`FreeThrowsMadeModes points: ${FreeThrowsMadeModes}`)
      // console.log(`Mode points: ${modes}`)
    })
    setPlayersMode(temp)
  }

  const calculateMedian = (playerDataForLastTenGames) => {
    const tempArrForMedian = []
    const minStatsValue = []
    const maxStatsValue = []
    const rangeStatsArr = []

    playerDataForLastTenGames?.forEach((playerArr = [], index) => {
      const sortByPointsForTopRanked = playerArr.sort(
        (a, b) => a.Points - b.Points
      )
      const sortByPoints = playerArr.map((pl) => pl.Points)
      sortByPoints.sort((a, b) => a - b)
      const sortByThreePointersMade = playerArr.map(
        (pl) => pl.ThreePointersMade
      )
      sortByThreePointersMade.sort((a, b) => a - b)
      const sortByFreeThrowsMade = playerArr.map((pl) => pl.FreeThrowsMade)
      sortByFreeThrowsMade.sort((a, b) => a - b)
      const sortByAssists = playerArr.map((pl) => pl.Assists)
      sortByAssists.sort((a, b) => a - b)
      const sortByRebounds = playerArr.map((pl) => pl.Rebounds)
      sortByRebounds.sort((a, b) => a - b)
      const sortByPersonalFouls = playerArr.map((pl) => pl.PersonalFouls)
      sortByPersonalFouls.sort((a, b) => a - b)
      const sortByBlockedShots = playerArr.map((pl) => pl.BlockedShots)
      sortByBlockedShots.sort((a, b) => a - b)
      const sortBySteals = playerArr.map((pl) => pl.Steals)
      sortBySteals.sort((a, b) => a - b)

      // const sortByThreePointersMade = playerArr.sort(
      //   (a, b) => a.ThreePointersMade - b.ThreePointersMade
      // )

      // const sortByRebounds = playerArr.sort((a, b) => a.Rebounds - b.Rebounds)
      // const sortByPersonalFouls = playerArr.sort(
      //   (a, b) => a.PersonalFouls - b.PersonalFouls
      // )
      // const sortByBlockedShots = playerArr.sort(
      //   (a, b) => a.BlockedShots - b.BlockedShots
      // )
      // const sortBySteals = playerArr.sort((a, b) => a.Steals - b.Steals)

      const length = playerArr.length
      const middleIndex = Math.floor(length / 2)
      let medianPoints,
        medianThreePointersMade,
        medianFreeThrowsMade,
        medianAssists,
        medianRebounds,
        medianPersonalFouls,
        medianBlockedShots,
        medianSteals

      if (length % 2 === 1) {
        medianPoints = sortByPoints[middleIndex]
        medianThreePointersMade = sortByThreePointersMade[middleIndex]
        medianFreeThrowsMade = sortByFreeThrowsMade[middleIndex]
        medianAssists = sortByAssists[middleIndex]
        medianRebounds = sortByRebounds[middleIndex]
        medianPersonalFouls = sortByPersonalFouls[middleIndex]
        medianBlockedShots = sortByBlockedShots[middleIndex]
        medianSteals = sortBySteals[middleIndex]
      } else {
        medianPoints =
          (sortByPoints[middleIndex - 1] + sortByPoints[middleIndex]) / 2
        medianThreePointersMade =
          (sortByThreePointersMade[middleIndex - 1] +
            sortByThreePointersMade[middleIndex]) /
          2
        medianFreeThrowsMade =
          (sortByFreeThrowsMade[middleIndex - 1] +
            sortByFreeThrowsMade[middleIndex]) /
          2
        medianAssists =
          (sortByAssists[middleIndex - 1] + sortByAssists[middleIndex]) / 2
        medianRebounds =
          (sortByRebounds[middleIndex - 1] + sortByRebounds[middleIndex]) / 2
        medianPersonalFouls =
          (sortByPersonalFouls[middleIndex - 1] +
            sortByPersonalFouls[middleIndex]) /
          2
        medianBlockedShots =
          (sortByBlockedShots[middleIndex - 1] +
            sortByBlockedShots[middleIndex]) /
          2
        medianSteals =
          (sortBySteals[middleIndex - 1] + sortBySteals[middleIndex]) / 2
      }
      tempArrForMedian.push({
        ...playerArr[0],
        Points: medianPoints,
        ThreePointersMade: medianThreePointersMade,
        FreeThrowsMade: medianFreeThrowsMade,
        Assists: medianAssists,
        Rebounds: medianRebounds,
        PersonalFouls: medianPersonalFouls,
        BlockedShots: medianBlockedShots,
        Steals: medianSteals,
      })
      minStatsValue.push({
        ...playerArr[length - 1],
        Points: sortByPoints[0],
        FreeThrowsMade: sortByFreeThrowsMade[length - 1],
        ThreePointersMade: sortByThreePointersMade[length - 1],
        Assists: sortByAssists[length - 1],
        Rebounds: sortByRebounds[length - 1],
        PersonalFouls: sortByPersonalFouls[length - 1],
        BlockedShots: sortByBlockedShots[length - 1],
        Steals: sortBySteals[length - 1],
      })
      maxStatsValue.push({
        ...playerArr[0],
        Points: sortByPoints[sortByPoints?.length - 1],
        FreeThrowsMade: sortByFreeThrowsMade[sortByFreeThrowsMade?.length - 1],
        ThreePointersMade:
          sortByThreePointersMade[sortByFreeThrowsMade?.length - 1],
        Assists: sortByAssists[sortByAssists?.length - 1],
        Rebounds: sortByRebounds[sortByRebounds?.length - 1],
        PersonalFouls: sortByPersonalFouls[sortByPersonalFouls.length - 1],
        BlockedShots: sortByBlockedShots[sortByBlockedShots.length - 1],
        Steals: sortBySteals[sortBySteals.length - 1],
      })
      rangeStatsArr.push({
        ...playerArr[0],
        Points: sortByPoints[sortByPoints?.length - 1] - sortByPoints[0],
        FreeThrowsMade:
          sortByFreeThrowsMade[length - 1] - sortByFreeThrowsMade[0],
        ThreePointersMade:
          sortByThreePointersMade[length - 1] - sortByThreePointersMade[0],
        Assists: sortByAssists[length - 1] - sortByAssists[0],
        Rebounds: sortByRebounds[length - 1] - sortByRebounds[0],
        PersonalFouls: sortByPersonalFouls[length - 1] - sortByPersonalFouls[0],
        BlockedShots: sortByBlockedShots[length - 1] - sortByBlockedShots[0],
        Steals: sortBySteals[length - 1] - sortBySteals[0],
      })
    })
    setMinimumStatsValue(minStatsValue)
    setMaximumStatsValue(maxStatsValue)
    setPlayersMedian(tempArrForMedian)
    setRangeStatsValue(rangeStatsArr)
  }

  const getPlayerGameStatsByDate = async (date) => {
    try {
      const response = await axios.get(
        `http://54.88.53.54:8080/PlayerGameStatsByDate/${date}`
      )
      console.log("playerGameStatsByDate:  ", response.data)
      // setPlayerSeasonStats(response.data);
    } catch (error) {
      console.error(error)
    } finally {
      // setLoading(false);
    }
  }

  const [loading, setLoading] = useState(false)

  const [seasonYear, setSeasonYear] = useState(new Date().getFullYear())

  const fetchCurrentSeasonDetails = async () => {
    try {
      const response = await axios.get("http://54.88.53.54:8080/")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <div className="my-5">
        <Collapse accordion>
          <Collapse.Panel header="Last Ten Games Average" key="1">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={playerSeasonStats}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Median" key="2">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playersMedian}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Minimum" key="3">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={minimumStatsValue}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Maximum" key="4">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={maximumStatsValue}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Range" key="5">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={rangeStatsValue}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games GeoMean" key="6">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playersGeomeanData}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Mode" key="7">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playersMode}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By Points" key="8">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.Points}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By ThreePointersMade" key="9">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.ThreePointersMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By FreeThrowsMade" key="10">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.FreeThrowsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By Assists" key="11">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.Assists}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By Rebounds" key="12">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.Rebounds}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By PersonalFouls" key="13">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.PersonalFouls}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By BlockedShots" key="14">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.BlockedShots}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Worst Ranked Players By Steals" key="15">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesWorstRankedPlayers?.Steals}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Top Ranked Players By Points" key="16">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesTopRankedPlayers?.Points}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Top Ranked Players By ThreePointersMade" key="17">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesTopRankedPlayers?.ThreePointersMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Top Ranked Players By FreeThrowsMade" key="18">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesTopRankedPlayers?.FreeThrowsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Top Ranked Players By Rebounds" key="19">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesTopRankedPlayers?.Rebounds}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Top Ranked Players By PersonalFouls" key="20">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesTopRankedPlayers?.PersonalFouls}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Top Ranked Players By BlockedShots" key="21">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesTopRankedPlayers?.BlockedShots}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Top Ranked Players By Steals" key="22">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={lastTenGamesTopRankedPlayers?.Steals}
            loading={loading}
          />
          </Collapse.Panel>
          {/* <Collapse.Panel header="Players Stats Mode for Last 10 Games" key="23">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playersMode}
            loading={loading}
          />
          </Collapse.Panel> */}
          <Collapse.Panel header="Season Average" key="24">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsAvgData}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by Points" key="25">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinByPoints}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by ThreePointersMade" key="26">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinByThreePointersMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by FreeThrowsMade" key="27">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinByFreeThrowsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by Assists" key="28">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinByAssists}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by Rebounds" key="29">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinByRebounds}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by PersonalFouls" key="30">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinByPersonalFouls}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by BlockedShots" key="31">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinByBlockedShots}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by Steals" key="32">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMin?.playerSeasonMinBySteals}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by Points" key="33">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxByPoints}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by ThreePointersMade" key="34">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxByThreePointersMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by FreeThrowsMade" key="35">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxByFreeThrowsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by Assists" key="36">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxByAssists}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by Rebounds" key="37">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxByRebounds}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by PersonalFouls" key="38">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxByPersonalFouls}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by BlockedShots" key="39">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxByBlockedShots}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by Steals" key="40">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStatsByMax?.playerSeasonMaxBySteals}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by Points" key="41">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersByPoints}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by ThreePointers" key="42">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersByThreePointsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by FreeThrowsMade" key="43">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersByFreeThrowsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by Assists" key="40">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersByAssists}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by Rebounds" key="41">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersByRebounds}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by PersonalFouls" key="42">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersByPersonalFouls}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by Blocked Shots" key="43">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersByBlocks}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Top Ranked Players by Steals" key="44">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonTopRankedPlayersBySteals}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by Points" key="45">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersByPoints}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by ThreePointers" key="46">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersByThreePointsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by FreeThrowsMade" key="47">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersByFreeThrowsMade}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by Assists" key="48">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersByAssists}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by Rebounds" key="49">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersByRebounds}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by PersonalFouls" key="50">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersByPersonalFouls}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by Blocks" key="51">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersByBlocks}
            loading={loading}
          />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by Steals" key="52">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={seasonWorstRankedPlayersBySteals}
            loading={loading}
          />
          </Collapse.Panel>
        </Collapse>
      </div>
    </>
  )
}

export default SeasonStats
