export default function Dropdown({ onFilterChange }) {
    const handleTopicClick = (topic) => {
        onFilterChange(topic);
    };
    return (
        <>
            <button className='dropbtn'>Filter by topic</button>
            <div className='dropdown-content'>
                <button onClick={() => handleTopicClick("All")}>All</button>
                <button onClick={() => handleTopicClick("Coding")}>All</button>
                <button onClick={() => handleTopicClick("Cooking")}>All</button>
                <button onClick={() => handleTopicClick("Football")}>All</button>
            </div>
        </>
    );
}