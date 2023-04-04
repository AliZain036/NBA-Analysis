import React, { useEffect, useState } from "react"
import { Input, Button, Spin, Table } from "antd"
import axios from "redaxios"
import moment from "moment"

const SeasonStats = () => {
  useEffect(() => {
    // fetchCurrentSeasonDetails()
    // fetchPlayerSeasonDetails()
    getSchedules()
  }, [])

  const [lastTenGamesData, setLastTenGamesData] = useState([])

  const getSchedules = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `http://13.50.100.95:8080/schedules/${seasonYear}`,
        { headers: { Origin: "https://nba-analysis-swart.vercel.app" } }
      )
      const sortedData = res.data.reverse()
      let tenGamesData = []
      sortedData?.map((game, index) => {
        if (game.Status === "Final") {
          if (tenGamesData?.length < 10) {
            tenGamesData.push(game)
          }
        }
      })
      let date = moment(tenGamesData[9]?.Day).format("YYYY-MMM-DD")
      getPlayerGameStatsByDate(date)
      if (tenGamesData) {
        const firstGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[0]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const secondGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[1]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const thirdGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[2]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const fourthGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[3]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const fifthGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[4]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const sixthGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[5]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const seventhGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[6]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const eighthGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[7]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const ninthGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[8]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        const tenthGameUrl = fetch(
          `http://13.50.100.95:8080/PlayerGameStatsByDate/${moment(
            tenGamesData[9]?.Day
          ).format("YYYY-MMM-DD")}`
        )
        let response = await Promise.all([
          (await firstGameUrl).json(),
          (await secondGameUrl).json(),
          (await thirdGameUrl).json(),
          (await fourthGameUrl).json(),
          (await fifthGameUrl).json(),
          (await sixthGameUrl).json(),
          (await seventhGameUrl).json(),
          (await eighthGameUrl).json(),
          (await ninthGameUrl).json(),
          (await tenthGameUrl).json(),
        ])
        console.log({ response })
        setLastTenGamesData(response)
        calculateAvg(response)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const [playerSeasonStats, setPlayerSeasonStats] = useState([])

  const calculateAvg = async (gamesData) => {
    const temp = []
    gamesData.forEach((arr, ind) => {
      arr.forEach((item, index) => {
        const itemIndex = temp.findIndex(
          (el) => el["PlayerID"] === item["PlayerID"]
        )
        if (itemIndex === -1) {
          temp.push(item)
        } else {
          temp[itemIndex]["Points"] = temp[itemIndex]["Points"] + item["Points"]
          temp[itemIndex]["ThreePointersMade"] =
            temp[itemIndex]["ThreePointersMade"] + item["ThreePointersMade"]
          temp[itemIndex]["FreeThrowsMade"] =
            temp[itemIndex]["FreeThrowsMade"] + item["FreeThrowsMade"]
          temp[itemIndex]["Assists"] =
            temp[itemIndex]["Assists"] + item["Assists"]
          temp[itemIndex]["Rebounds"] =
            temp[itemIndex]["Rebounds"] + item["Rebounds"]
          temp[itemIndex]["PersonalFouls"] =
            temp[itemIndex]["PersonalFouls"] + item["PersonalFouls"]
          temp[itemIndex]["BlockedShots"] =
            temp[itemIndex]["BlockedShots"] + item["BlockedShots"]
          temp[itemIndex]["Steals"] = temp[itemIndex]["Steals"] + item["Steals"]
        }
        // const itemToUpdate = temp[index];
        // const itemToAdd = arr.find((obj) => obj.Name === itemToUpdate.Name);
        // if (itemToUpdate?.Points >= 0 && itemToAdd && itemToAdd?.Points >= 0) {
        //   itemToUpdate["Points"] = itemToAdd["Points"] + itemToUpdate["Points"];
        // } else {
        //   temp.push({ ...item });
        // }
        // temp[index].Points += arr[ind][index]?.Points
        // console.log(temp[index].Points += arr[ind][index]?.Points);
      })
    })
    console.log({ temp })
    temp.forEach((item) => {
      item["Points"] = item["Points"] / gamesData.length
      item["ThreePointersMade"] = item["ThreePointersMade"] / gamesData.length
      item["FreeThrowsMade"] = item["FreeThrowsMade"] / gamesData.length
      item["Assists"] = item["Assists"] / gamesData.length
      item["Rebounds"] = item["Rebounds"] / gamesData.length
      item["PersonalFouls"] = item["PersonalFouls"] / gamesData.length
      item["BlockedShots"] = item["BlockedShots"] / gamesData.length
      item["Steals"] = item["Steals"] / gamesData.length
    })
    console.log("after finding average   ", { temp })
    setPlayerSeasonStats(temp)
    setLoading(false)
    // const players = gamesData.reduce((acc, game) => {
    //   game.forEach((player) => {
    //     const index = acc.findIndex((p) => p.name === player.name)
    //     if (index === -1) {
    //       acc.push({ name: player.name, averagePoints: player.Points })
    //     } else {
    //       acc[index].averagePoints =
    //         (acc[index].averagePoints + player.Points) / 2
    //     }
    //   })
    //   return acc
    // }, [])
  }

  const getPlayerGameStatsByDate = async (date) => {
    try {
      const response = await axios.get(
        `http://13.50.100.95:8080/PlayerGameStatsByDate/${date}`
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
  const [seasonStats, setSeasonStats] = useState({
    average: 0,
    mode: [{ Points: 0 }],
    median: 0,
  })
  const [seasonMode, setSeasonMode] = useState({
    Points: 0,
  })

  const fetchCurrentSeasonDetails = async () => {
    try {
      const response = await axios.get("http://13.50.100.95:8080")
    } catch (error) {
      alert(error)
    }
  }

  const fetchPlayerSeasonDetails = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `http://13.50.100.95:8080/PlayerSeasonStats/${seasonYear}`
      )
      // setPlayerSeasonStats(response.data)
      // calculateMode(response.data, 'Points')
      // calculateMode(response.data, 'Assists')
      // calculateMode(response.data, 'Rebounds')
    } catch (error) {
      alert(error)
    } finally {
      // setLoading(false)
    }
  }

  const calculateMode = (arr, key) => {
    let frequency = {}
    let maxFreq = 0
    let mode

    arr.forEach((obj) => {
      let val = obj[key]
      frequency[val] = frequency[val] || 0
      frequency[val]++
      if (frequency[val] > maxFreq) {
        maxFreq = frequency[val]
        mode = val
      }
    })
    setSeasonMode((prev) => ({ ...prev, [key]: mode }))
    return mode
  }

  const playerSeasonStatsTableColumn = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      //   filters: [
      //     ...playerSeasonStats?.map((pl) => {
      //       return { text: pl.Name, value: pl.Name }
      //     }),
      //   ],
      //   filterSearch: true,
      //   onFilter: (value, record) => record?.Name?.startsWith(value),
      //   width: '30%',
    },
    {
      title: "Team",
      dataIndex: "Team",
      key: "Team",
    },
    {
      title: "TeamID",
      dataIndex: "TeamID",
      key: "TeamID",
    },
    {
      title: "Position",
      dataIndex: "Position",
      key: "Position",
    },
    {
      title: "Points",
      dataIndex: "Points",
      key: "Points",
    },
    {
      title: "3 Pointers",
      dataIndex: "ThreePointersMade",
      key: "ThreePointersMade",
    },
    {
      title: "FT Made",
      dataIndex: "FreeThrowsMade",
      key: "FreeThrowsMade",
    },
    {
      title: "Assists",
      dataIndex: "Assists",
      key: "Assists",
    },
    {
      title: "Rebounds",
      dataIndex: "Rebounds",
      key: "Rebounds",
    },
    {
      title: "Personal Fouls",
      dataIndex: "PersonalFouls",
      key: "PersonalFouls",
    },
    {
      title: "Blocks",
      dataIndex: "BlockedShots",
      key: "BlockedShots",
    },
    {
      title: "Steals",
      dataIndex: "Steals",
      key: "Steals",
    },
  ]

  return (
    <Spin spinning={loading}>
      <div>
        <h3 className="mt-3">Player Game Stats for Last 10 Games</h3>
        {/* <div className="mt-3">
          <label>Season Year</label>
          <div className="d-flex gap-3">
            <Input
              type="number"
              value={seasonYear}
              onChange={(e) => {
                e.target.value = e.target.value.slice(0, 4)
                setSeasonYear(e.target.value)
              }}
              max={new Date().getFullYear()}
            />
            <Button onClick={fetchPlayerSeasonDetails} type="primary">
              Fetch Details
            </Button>
          </div>
        </div> */}
        <div className="mt-3">
          <Table
            columns={playerSeasonStatsTableColumn}
            dataSource={playerSeasonStats}
          />
        </div>
      </div>
    </Spin>
  )
}

export default SeasonStats
