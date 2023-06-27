import React, { useEffect, useState } from "react"
import { Input, Button, Spin, Table, Collapse } from "antd"
import axios from "redaxios"
import moment from "moment"

const api = "http://54.88.53.54:8080"
// const api = "http://localhost:8080"

const SeasonStats = () => {
  const playerSeasonStatsTableColumn = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      sorter: (a, b) => a?.Name?.localeCompare(b?.Name),
    },
    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
      sorter: (a, b) => a?.Team?.localeCompare(b?.Team),
    },
    {
      title: "TeamID",
      dataIndex: "TeamID",
      key: "TeamID",
    },
    {
      title: "Position",
      dataIndex: "Position",
      sorter: (a, b) => a?.Position?.localeCompare(b?.Position),
      key: "Position",
    },
    {
      title: "Games Played",
      dataIndex: "GamesCount",
      key: "GamesCount",
      sorter: (a, b) => a.GamesCount - b.GamesCount,
      render: (GamesCount, record) => {
        return <p>{GamesCount}</p>
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
  const seasonDefenceVsPositionColumns = [
    // {
    //   title: "Name",
    //   dataIndex: "Name",
    //   key: "Name",
    //   sorter: (a, b) => a?.Name?.localeCompare(b?.Name),
    // },
    {
      title: "Team",
      dataIndex: "Opponent",
      key: "Opponent",
      sorter: (a, b) => a?.Team?.localeCompare(b?.Opponent),
    },
    {
      title: "TeamID",
      dataIndex: "OpponentID",
      key: "OpponentID",
      sorter: (a, b) => a.OpponentID - b.OpponentID,
    },
    {
      title: "Position",
      dataIndex: "Position",
      sorter: (a, b) => a?.Position?.localeCompare(b?.Position),
      key: "Position",
    },
    {
      title: "Games Played",
      dataIndex: "GamesCount",
      key: "GamesCount",
      sorter: (a, b) => a.GamesCount - b.GamesCount,
      render: (GamesCount, record) => {
        return <p>{GamesCount}</p>
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
      title: "FT Attempted",
      dataIndex: "FreeThrowsAttempted",
      key: "FreeThrowsAttempted",
      sorter: (a, b) => a.FreeThrowsAttempted - b.FreeThrowsAttempted,
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
  const seasoneVsOpponentColumns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      sorter: (a, b) => a?.Name?.localeCompare(b?.Name),
    },
    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
      sorter: (a, b) => a?.Team?.localeCompare(b?.Team),
    },
    {
      title: "TeamID",
      dataIndex: "TeamID",
      key: "TeamID",
    },
    {
      title: "Position",
      dataIndex: "Position",
      sorter: (a, b) => a?.Position?.localeCompare(b?.Position),
      key: "Position",
    },
    {
      title: "Opponent",
      dataIndex: "Opponent",
      sorter: (a, b) => a?.Opponent?.localeCompare(b?.Opponent),
      key: "Opponent",
    },
    {
      title: "Games Played",
      dataIndex: "GamesCount",
      key: "GamesCount",
      sorter: (a, b) => a.GamesCount - b.GamesCount,
      render: (GamesCount, record) => {
        return <p>{GamesCount}</p>
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

  const [lastTenGamesAverage, setLastTenGamesAverage] = useState([])
  const [lastTenGamesMinimum, setLastTenGamesMinimum] = useState([])
  const [lastTenGamesMaximum, setLastTenGamesMaximum] = useState([])
  const [lastTenGamesMode, setLastTenGamesMode] = useState([])
  const [lastTenGamesMedian, setLastTenGamesMedian] = useState([])
  const [lastTenGamesGeoMean, setLastTenGamesGeoMean] = useState([])
  const [lastTenGamesRange, setLastTenGamesRange] = useState([])

  const [loading, setLoading] = useState(false)

  const [seasonYear, setSeasonYear] = useState(new Date().getFullYear())

  const [seasonAverage, setSeasonAverage] = useState([])
  const [seasonDefenceVsPositionAverage, setSeasonDefenceVsPositionAverage] =
    useState([])
  const [seasonDefenceVsPositionMode, setSeasonDefenceVsPositionMode] =
    useState([])
  const [seasonDefenceVsPositionMedian, setSeasonDefenceVsPositionMedian] =
    useState([])
  const [seasonDefenceVsPositionGeoMean, setSeasonDefenceVsPositionGeoMean] =
    useState([])
  const [
    seasonLastTenDefenceVsPositionAverage,
    setSeasonLastTenDefenceVsPositionAverage,
  ] = useState([])
  const [
    seasonLastTenDefenceVsPositionMode,
    setSeasonLastTenDefenceVsPositionMode,
  ] = useState([])
  const [
    seasonLastTenDefenceVsPositionMedian,
    setSeasonLastTenDefenceVsPositionMedian,
  ] = useState([])
  const [
    seasonLastTenDefenceVsPositionGeoMean,
    setSeasonLastTenDefenceVsPositionGeoMean,
  ] = useState([])
  const [seasonMinimum, setSeasonMinimum] = useState([])
  const [seasonMaximum, setSeasonMaximum] = useState([])
  const [seasonMode, setSeasonMode] = useState([])
  const [seasonMedian, setSeasonMedian] = useState([])
  const [seasonGeoMean, setSeasonGeoMean] = useState([])
  const [seasonRange, setSeasonRange] = useState([])

  const [seasonVersusAverage, setSeasonVersusAverage] = useState([])
  const [seasonVersusMinimum, setSeasonVersusMinimum] = useState([])
  const [seasonVersusMaximum, setSeasonVersusMaximum] = useState([])
  const [seasonVersusMode, setSeasonVersusMode] = useState([])
  const [seasonVersusMedian, setSeasonVersusMedian] = useState([])
  const [seasonVersusGeoMean, setSeasonVersusGeoMean] = useState([])
  const [seasonVersusRange, setSeasonVersusRange] = useState([])

  useEffect(() => {
    // Get Last Ten Games Stats Functions
    getLastTenGamesAverage()
    getLastTenGamesMode()
    getLastTenGamesMedian()
    getLastTenGamesGeoMean()
    getLastTenGamesMaximum()
    getLastTenGamesMinimum()
    getLastTenGamesRange()

    // getSchedules()
    // getPlayerSeasonStats()
    // fetchPlayerGameData()
    // fetchPlayerSeasonData()

    getSeasonDefenceVsPositionAverage()
    getSeasonDefenceVsPositionMode()
    getSeasonDefenceVsPositionMedian()
    getSeasonDefenceVsPositionGeoMean()

    getSeasonLastTenDefenceVsPositionAverage()
    getSeasonLastTenDefenceVsPositionMode()
    getSeasonLastTenDefenceVsPositionMedian()
    getSeasonLastTenDefenceVsPositionGeoMean()

    getSeasonAverage()
    getSeasonMinimum()
    getSeasonMaximum()
    getSeasonMedian()
    getSeasonGeoMean()
    getSeasonMode()
    getSeasonRange()

    // Season Versus Stats
    getSeasonVersusAverage()
    getSeasonVersusMinimum()
    getSeasonVersusMaximum()
    getSeasonVersusMedian()
    getSeasonVersusGeoMean()
    getSeasonVersusMode()
    getSeasonVersusRange()
  }, [])

  const getLastTenGamesAverage = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-average`)
      setLastTenGamesAverage(respone.data.data)
      console.log(respone.data.data, " === last ten games average")
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonDefenceVsPositionAverage = async () => {
    try {
      const respone = await axios.get(
        `${api}/season/defence-vs-position-average`
      )
      setSeasonDefenceVsPositionAverage(respone.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonDefenceVsPositionMode = async () => {
    try {
      const respone = await axios.get(`${api}/season/defence-vs-position-mode`)
      setSeasonDefenceVsPositionMode(respone.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonDefenceVsPositionMedian = async () => {
    try {
      const respone = await axios.get(
        `${api}/season/defence-vs-position-median`
      )
      setSeasonDefenceVsPositionMedian(respone.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonDefenceVsPositionGeoMean = async () => {
    try {
      const respone = await axios.get(
        `${api}/season/defence-vs-position-geomean`
      )
      setSeasonDefenceVsPositionGeoMean(respone.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonLastTenDefenceVsPositionAverage = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-dvp-average`)
      setSeasonLastTenDefenceVsPositionAverage(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonLastTenDefenceVsPositionMode = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-dvp-mode`)
      setSeasonLastTenDefenceVsPositionMode(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonLastTenDefenceVsPositionMedian = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-dvp-median`)
      setSeasonLastTenDefenceVsPositionGeoMean(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonLastTenDefenceVsPositionGeoMean = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-dvp-geomean`)
      setSeasonLastTenDefenceVsPositionGeoMean(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getLastTenGamesMode = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-mode`)
      setLastTenGamesMode(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getLastTenGamesMedian = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-median`)
      setLastTenGamesMedian(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getLastTenGamesGeoMean = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-geomean`)
      setLastTenGamesGeoMean(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getLastTenGamesMinimum = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-minimum`)
      setLastTenGamesMinimum(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getLastTenGamesMaximum = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-maximum`)
      setLastTenGamesMaximum(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getLastTenGamesRange = async () => {
    try {
      const respone = await axios.get(`${api}/game/last-ten-range`)
      setLastTenGamesRange(respone.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonMedian = async () => {
    try {
      const response = await axios.get(`${api}/season/median`)
      setSeasonMedian(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonMode = async () => {
    try {
      const response = await axios.get(`${api}/season/mode`)
      setSeasonMode(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonAverage = async () => {
    try {
      const response = await axios.get(`${api}/season/average`)
      console.log(response.data.docs, "  Season versus average")
      setSeasonAverage(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonGeoMean = async () => {
    try {
      const response = await axios.get(`${api}/season/geoMean`)
      setSeasonGeoMean(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonMinimum = async () => {
    try {
      const response = await axios.get(`${api}/season/minimum`)
      // console.log(response.data.docs, "  season minimum")
      setSeasonMinimum(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonMaximum = async () => {
    try {
      const response = await axios.get(`${api}/season/maximum`)
      setSeasonMaximum(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonRange = async () => {
    try {
      const response = await axios.get(`${api}/season/range`)
      setSeasonRange(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  const getSeasonVersusMedian = async () => {
    try {
      const response = await axios.get(`${api}/season/versus-median`)
      setSeasonVersusMedian(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonVersusAverage = async () => {
    try {
      const response = await axios.get(`${api}/season/versus-average`)
      setSeasonVersusAverage(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonVersusMode = async () => {
    try {
      const response = await axios.get(`${api}/season/versus-mode`)
      setSeasonVersusMode(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonVersusGeoMean = async () => {
    try {
      const response = await axios.get(`${api}/season/versus-geoMean`)
      setSeasonVersusGeoMean(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonVersusMinimum = async () => {
    try {
      const response = await axios.get(`${api}/season/versus-minimum`)
      setSeasonVersusMinimum(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonVersusMaximum = async () => {
    try {
      const response = await axios.get(`${api}/season/versus-maximum`)
      setSeasonVersusMaximum(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }
  const getSeasonVersusRange = async () => {
    try {
      const response = await axios.get(`${api}/season/versus-range`)
      setSeasonVersusRange(response.data.docs)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="my-5">
        <Collapse accordion>
          <Collapse.Panel header="Last Ten Games Average" key="1">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={lastTenGamesAverage}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Median" key="2">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={lastTenGamesMedian}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Minimum" key="3">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={lastTenGamesMinimum}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Maximum" key="4">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={lastTenGamesMaximum}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Range" key="5">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={lastTenGamesRange}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games GeoMean" key="6">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={lastTenGamesGeoMean}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Last Ten Games Mode" key="7">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={lastTenGamesMode}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By Points"
            key="8"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.Points - b.Points)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By ThreePointersMade"
            key="9"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.ThreePointersMade - b.ThreePointersMade)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By FreeThrowsMade"
            key="10"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.FreeThrowsMade - b.FreeThrowsMade)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By Assists"
            key="11"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.Assists - b.Assists)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By Rebounds"
            key="12"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.Rebounds - b.Rebounds)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By PersonalFouls"
            key="13"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.PersonalFouls - b.PersonalFouls)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By BlockedShots"
            key="14"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.BlockedShots - b.BlockedShots)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Worst Ranked Players By Steals"
            key="15"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => a.Steals - b.Steals)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Top Ranked Players By Points"
            key="16"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => b.Points - a.Points)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Top Ranked Players By ThreePointersMade"
            key="17"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => b.ThreePointersMade - a.ThreePointersMade)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Top Ranked Players By FreeThrowsMade"
            key="18"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort(
                  (a, b) => b.FreeThrowsMadeAverage - a.FreeThrowsMadeAverage
                )
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Top Ranked Players By Rebounds"
            key="19"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => b.Rebounds - a.Rebounds)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Top Ranked Players By PersonalFouls"
            key="20"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => b.PersonalFouls - a.PersonalFouls)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Top Ranked Players By BlockedShots"
            key="21"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => b.BlockedShots - a.BlockedShots)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Games Top Ranked Players By Steals"
            key="22"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...lastTenGamesAverage]
                .sort((a, b) => b.Steals - a.Steals)
                .slice(0, 50)}
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
              dataSource={seasonAverage}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Minimun" key="25">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={seasonMinimum}
              loading={loading}
            />
          </Collapse.Panel>
          {/* <Collapse.Panel header="Season Minimun by Points" key="25">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={playerSeasonStatsByMin?.playerSeasonMinByPoints}
              loading={loading}
            />
          </Collapse.Panel> */}
          {/* <Collapse.Panel header="Season Minimun by ThreePointersMade" key="26">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={
                playerSeasonStatsByMin?.playerSeasonMinByThreePointersMade
              }
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Minimun by FreeThrowsMade" key="27">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={
                playerSeasonStatsByMin?.playerSeasonMinByFreeThrowsMade
              }
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
              dataSource={
                playerSeasonStatsByMin?.playerSeasonMinByPersonalFouls
              }
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
          </Collapse.Panel> */}
          <Collapse.Panel header="Season Maximum" key="33">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={seasonMaximum}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Mode" key="34">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={seasonMode}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Median" key="35">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={seasonMedian}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season GeoMean" key="36">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={seasonGeoMean}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Range" key="37">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={seasonRange}
              loading={loading}
            />
          </Collapse.Panel>
          {/* <Collapse.Panel header="Season Maximum by Points" key="33">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={playerSeasonStatsByMax?.playerSeasonMaxByPoints}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by ThreePointersMade" key="34">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={
                playerSeasonStatsByMax?.playerSeasonMaxByThreePointersMade
              }
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Maximum by FreeThrowsMade" key="35">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={
                playerSeasonStatsByMax?.playerSeasonMaxByFreeThrowsMade
              }
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
              dataSource={
                playerSeasonStatsByMax?.playerSeasonMaxByPersonalFouls
              }
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
          </Collapse.Panel> */}
          <Collapse.Panel header="Season Worst Ranked Players by Points" key="41">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.Points - b.Points)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Worst Ranked Players by ThreePointersMade"
            key="42"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.ThreePointersMade - b.ThreePointersMade)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Worst Ranked Players by FreeThrowsMade"
            key="43"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.FreeThrowsMade - b.FreeThrowsMade)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Worst Ranked Players by Assists"
            key="44"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.Assists - b.Assists)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Worst Ranked Players by Rebounds"
            key="45"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.Rebounds - b.Rebounds)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Worst Ranked Players by PersonalFouls"
            key="46"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.PersonalFouls - b.PersonalFouls)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Worst Ranked Players by Blocked Shots"
            key="47"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.BlockedShots - b.BlockedShots)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Worst Ranked Players by Steals" key="48">
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => a.Steals - b.Steals)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by Points"
            key="49"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.Points - a.Points)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by ThreePointers"
            key="50"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.ThreePointersMade - a.ThreePointersMade)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by FreeThrowsMade"
            key="56"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.FreeThrowsMade - a.FreeThrowsMade)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by Assists"
            key="51"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.Assists - a.Assists)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by Rebounds"
            key="52"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.Rebounds - a.Rebounds)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by PersonalFouls"
            key="53"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.PersonalFouls - a.PersonalFouls)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by Blocked Shots"
            key="54"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.BlockedShots - a.BlockedShots)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Top Ranked Players by Steals"
            key="55"
          >
            <Table
              columns={playerSeasonStatsTableColumn}
              dataSource={[...seasonAverage]
                .sort((a, b) => b.Steals - a.Steals)
                .slice(0, 50)}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Versus Average" key="26">
            <Table
              columns={seasoneVsOpponentColumns}
              dataSource={seasonVersusAverage}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Versus Minimum" key="27">
            <Table
              columns={seasoneVsOpponentColumns}
              dataSource={seasonVersusMinimum}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Versus Maximum" key="28">
            <Table
              columns={seasoneVsOpponentColumns}
              dataSource={seasonVersusMaximum}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Versus Range" key="29">
            <Table
              columns={seasoneVsOpponentColumns}
              dataSource={seasonVersusRange}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Versus Mode" key="30">
            <Table
              columns={seasoneVsOpponentColumns}
              dataSource={seasonVersusMode}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Versus Median" key="31">
            <Table
              columns={seasoneVsOpponentColumns}
              dataSource={seasonVersusMedian}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel header="Season Versus Geo Mean" key="32">
            <Table
              columns={seasoneVsOpponentColumns}
              dataSource={seasonVersusGeoMean}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Average By PG"
            key="64"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionAverage.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Average by SG"
            key="65"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionAverage.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Average by SF"
            key="66"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionAverage.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Average by PF"
            key="67"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionAverage.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Average by C"
            key="68"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionAverage.filter(
                (item) => item.Position === "C"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Mode by PG"
            key="69"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMode.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Mode by SG"
            key="70"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMode.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Mode by SF"
            key="71"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMode.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Mode by PF"
            key="72"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMode.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Mode by C"
            key="73"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMode.filter(
                (item) => item.Position === "C"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Median by PG"
            key="74"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMedian.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Median by SG"
            key="75"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMedian.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Median by SF"
            key="76"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMedian.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Median by PF"
            key="77"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMedian.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position Median by C"
            key="78"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionMedian}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position GeoMean by PG"
            key="79"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position GeoMean by SG"
            key="80"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position GeoMean by SF"
            key="81"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position GeoMean by PF"
            key="82"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Season Defense Vs Position GeoMean by C"
            key="83"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "C"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Average by PG"
            key="84"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionAverage.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Average by SG"
            key="85"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionAverage.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Average by SF"
            key="86"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionAverage.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Average by PF"
            key="87"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionAverage.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Average by C"
            key="88"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionAverage.filter(
                (item) => item.Position === "C"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Mode by PG"
            key="89"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionMode.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Mode by SG"
            key="90"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionMode.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Mode by SF"
            key="91"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionMode.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Mode by PF"
            key="92"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionMode.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Mode by C"
            key="93"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionMode.filter(
                (item) => item.Position === "C"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Median by PG"
            key="94"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Median by SG"
            key="95"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Median by SF"
            key="96"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Median by PF"
            key="97"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position Median by C"
            key="98"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonLastTenDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "C"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position GeoMean by PG"
            key="99"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "PG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position GeoMean by SG"
            key="100"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "SG"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position GeoMean by SF"
            key="101"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "SF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position GeoMean by PF"
            key="102"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "PF"
              )}
              loading={loading}
            />
          </Collapse.Panel>
          <Collapse.Panel
            header="Last Ten Defense Vs Position GeoMean by C"
            key="103"
          >
            <Table
              columns={seasonDefenceVsPositionColumns}
              dataSource={seasonDefenceVsPositionGeoMean.filter(
                (item) => item.Position === "C"
              )}
              loading={loading}
            />
          </Collapse.Panel>
        </Collapse>
      </div>
    </>
  )
}

export default SeasonStats
