
export function getUpcomingHoursData(weatherData) {
    let upcomingHoursData = weatherData ? weatherData.forecast.forecastday[0].hour : [];
    for (let hour of upcomingHoursData) {
        if (hour.time_epoch * 1000 > Date.now()) {
            const starting_index = upcomingHoursData.indexOf(hour) - 1;
            upcomingHoursData = upcomingHoursData.slice(starting_index);
            break;
        }
    }

    return upcomingHoursData;
}

export function getUpcomingDaysData(weatherData) {
    const upcomingDaysData = weatherData ? weatherData.forecast.forecastday.slice(1) : [];

    return upcomingDaysData;
}