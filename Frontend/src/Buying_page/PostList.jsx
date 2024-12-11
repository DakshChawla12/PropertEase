import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import Post from './Post';
import Loading from './Loading';
import Error from './Error';
import styles from './postlist.module.css';

const PostList = () => {
    const { data, loading, error, fetchListings, totalPages, currentPage, setCurrentPage, filters, applyFilters } = useContext(StoreContext);

    useEffect(() => {
        if (filters.price || filters.location || filters.area || filters.bedrooms || filters.bathrooms || filters.category) {
            applyFilters(currentPage);
        } else {
            fetchListings(currentPage);
        }
    }, [currentPage, filters.location, filters.bedrooms, filters.bathrooms, filters.category]);

    if (loading) {
        return <div className='flex items-center justify-center w-[69.5%]'><Loading /></div>;
    }

    if (error) {
        return <Error />;
    }

    if (data.length === 0) {
        return <div className='h-[40rem] w-[70rem] flex items-center justify-center'><p className='font-bold text-[3rem] text-blue-400'>No listings Found</p></div>;
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage - 1;
                filters ? applyFilters(newPage) : fetchListings(newPage);
                return newPage;
            });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => {
                const newPage = prevPage + 1;
                filters ? applyFilters(newPage) : fetchListings(newPage);
                return newPage;
            });
        }
    };

    return (
        <div className='flex flex-col'>
            <div className={styles.postlist}>
                {data.map((listing) => (
                    <Post
                        key={listing._id}
                        id={listing._id}
                        url={listing.images[0]}
                        location={listing.location}
                        bedrooms={listing.bedrooms}
                        bathrooms={listing.bathrooms}
                        area={listing.area}
                        price={listing.price}
                        category={listing.category}
                    />
                ))}
            </div>
            <div className='w-[31%] h-[3rem] flex justify-between items-center mt-8 mx-auto'>
                <button
                    disabled={currentPage === 1}
                    onClick={handlePreviousPage}
                    className='px-4 py-2 text-white bg-blue-400 rounded-sm disabled:opacity-50'
                >
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                    className='px-4 py-2 text-white bg-blue-400 rounded-sm disabled:opacity-50'
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PostList;
