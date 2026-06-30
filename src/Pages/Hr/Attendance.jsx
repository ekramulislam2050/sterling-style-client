import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import ErrMsg from "../../LoadingAndSuccessAndErrMsg/ErrMsg/ErrMsg";
import ListOfAllAttendance from "../../Components/ListOfAllAttendance/ListOfAllAttendance";



const Attendance = () => {
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(true)
    const [attendance, setAttendance] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("all")
    const [date, setDate] = useState('')

    // Ref--------------
    const containerRef = useRef(null)

    // search handler-------
    const handleSearch = (value) => {
        setAttendance([])
        setHasMore(true)
        setPage(1)
        setSearch(value)
    }

    // status handler---------
    const handleStatus = (value) => {
        setAttendance([])
        setHasMore(true)
        setPage(1)
        setStatus(value)
    }

    // date handler----------
    const handleDate = (value) => {
        setAttendance([])
        setHasMore(true)
        setPage(1)
        setDate(value)
    }


    // --------------data fetch---------------
    useEffect(() => {
        const fetchAttendance = async () => {
            setLoading(true)
            try {

                const res = await axiosSecure.get(`/api/getAllAttendanceData?page=${page}&search=${search}&status=${status}&date=${date}&limit=100`)

                const newData = res.data.data
                if (page === 1) {
                    setAttendance(newData)
                } else {
                    setAttendance((prev) => [...prev, ...newData])
                }

                setHasMore(page < res.data.totalPages)

            } catch (err) {

                ErrMsg('Failed to fetch allAttendance data to attendancePage(line:14)')

            } finally {
                setLoading(false)
            }
        }
        fetchAttendance()
    }, [axiosSecure, page, search, status, date])

    //  reset-----------
    const handleReset = () => {
        setAttendance([]);
        setHasMore(true);

        setSearch("");
        setStatus("all");
        setDate("");
        setPage(1);
    };

    // infinite scroll------------
    const handleScroll = () => {
        if (!containerRef.current || loading || !hasMore) return

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const reachedBottom = scrollHeight - scrollTop - clientHeight < 300;
        if (reachedBottom) {
            setPage((prev) => prev + 1)
        }

    }
    return (
        <div>
            <ListOfAllAttendance
                attendance={attendance}
                loading={loading}
                handleScroll={handleScroll}
                containerRef={containerRef}
                handleSearch={handleSearch}
                handleDate={handleDate}
                handleStatus={handleStatus}
                handleReset={handleReset}
                search={search}
                status={status}
                date={date}
            ></ListOfAllAttendance>
        </div>
    );
};

export default Attendance;