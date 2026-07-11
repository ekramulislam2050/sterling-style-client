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
    const [searchTxt,setSearchTxt]=useState("")
    // Ref--------------
    const containerRef = useRef(null)
    const timerRef = useRef(null)
    const fetchingRef=useRef(false)
    // ====================================
    // search handler start---------------
    // ====================================
    const handleSearch = (value) => {
        // search text set to state----------------
        setSearchTxt(value)

        // Removed old search key from timerRef store --------------
        clearTimeout(timerRef.current)
          
        // Storing new search key in timerRef -----------
        timerRef.current = setTimeout(() => {
            setAttendance([])
            setHasMore(true)
            setPage(1)
            setSearch(value)

        }, 500);

    }
    // timeOut() cleared when component is unmounted ---------
    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current)
        }
    }, [])
    // ====================================
    // search handler end---------------
    // ====================================

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
            fetchingRef.current=true;
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
                fetchingRef.current=false
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
        setSearchTxt("")
    };
 
    // infinite scroll------------
    const handleScroll = () => {
        if (!containerRef.current || !hasMore || fetchingRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const reachedBottom = scrollHeight - scrollTop - clientHeight < 300;
        if (reachedBottom) {
             fetchingRef.current=true
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
                searchTxt={searchTxt}
                
            ></ListOfAllAttendance>
        </div>
    );
};

export default Attendance;