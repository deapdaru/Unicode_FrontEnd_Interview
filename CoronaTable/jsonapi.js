fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
		"x-rapidapi-key": "b689037764msh2c41d7caffaaf26p18f086jsndb4d294b6e92"
	}
})
.then(response => response.json())
.then(data => {
    appendData(data);
    makeClone(data);
})
.catch(err => console.log(err));


var cloneData;

function makeClone(arr) {
    cloneData = [].concat(arr);
    // console.log(cloneData[0]);
}


function appendData(data) {
    // Inserting update time
    var lastUpdate = document.getElementById("lastupdate");
    lastUpdate.innerHTML = "Updated last: " + data.statistic_taken_at;
    // Inserting <tbody> Content
    var tableWorldContent = document.getElementById("tblbody1");

    var info = "<th>World</th>";
    info = "<tr>" + info;
    info = info + "<td>" + data.world_total.total_cases + "</td>";
    info = info + "<td style = 'background-color: lightskyblue;'>" + data.world_total.new_cases + "</td>";
    info = info + "<td>" + data.world_total.total_deaths + "</td>";
    info = info + "<td style = 'background-color: crimson;'>" + data.world_total.new_deaths + "</td>";
    info = info + "<td>" + data.world_total.active_cases + "</td>";
    info = info + "<td>" + data.world_total.serious_critical + "</td>";
    info = info + "<td>" + data.world_total.total_recovered + "</td>";
    info = info + "<td>" + data.world_total.total_cases_per_1m_population + "</td>";
    info = info + "<td>" + data.world_total.deaths_per_1m_population + "</td>";
    info = info + "<td>" + "</td>";
    info = info + "<td>" + "</td>";
    info = info + "</tr>";

    tableWorldContent.innerHTML = info;
    
    var tableBodyContent = document.getElementById("tblbody2");
    var infotbl = "";
    for (var i = 0; i < data.countries_stat.length; i++) {
        infotbl = infotbl + "<tr>";
        infotbl = infotbl + "<th>" + data.countries_stat[i].country_name + "</th>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].cases + "</td>";
        infotbl = infotbl + "<td style = 'background-color: lightskyblue;'>" + data.countries_stat[i].new_cases + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].deaths + "</td>";
        infotbl = infotbl + "<td style = 'background-color: crimson;'>" + data.countries_stat[i].new_deaths + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].active_cases + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].serious_critical + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].total_recovered + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].total_cases_per_1m_population + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].deaths_per_1m_population + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].total_tests + "</td>";
        infotbl = infotbl + "<td>" + data.countries_stat[i].tests_per_1m_population + "</td>";
        infotbl = infotbl + "</tr>";
    }

    tableBodyContent.innerHTML = infotbl;
}

var sortKeys = {
    active_cases: false,
    cases: true,
    country_name: false,
    deaths: false,
    deaths_per_1m_population: false,
    new_cases: false,
    new_deaths: false,
    serious_critical: false,
    tests_per_1m_population: false,
    total_cases_per_1m_population: false,
    total_recovered: false,
    total_tests: false
};

var sortKeyNames = ['active_cases', 'cases', 'country_name', 'deaths', 'deaths_per_1m_population', 'new_cases', 'new_deaths', 'serious_critical', 'tests_per_1m_population', 'total_cases_per_1m_population', 'total_recovered', 'total_tests'];

function sortKey(key) {
    for (var i = 0; i < sortKeyNames.length; i++) {
        if (sortKeyNames[i] != key) {
            sortKeys[sortKeyNames[i]] = false;
        }
    }

    if (!sortKeys[key]) {

        if (key == 'country_name') {
            cloneData[0].countries_stat.sort(function(a, b) {
                if (a[key] > b[key]) {    
                    return 1;    
                } else if (a[key] < b[key]) {    
                    return -1;    
                }    
                return 0;
            });
        } else {
            var idx;
            for (var pos=1; pos < cloneData[0].countries_stat.length ; pos++ ) {
                idx = pos ;

                while ( idx > 0 && Number(cloneData[0].countries_stat[idx][key].replace(/,/g,"").replace('N/A', "0")) > Number(cloneData[0].countries_stat[idx-1][key].replace(/,/g,"").replace('N/A', "0"))) {
                    var store = cloneData[0].countries_stat[idx];
                    cloneData[0].countries_stat[idx] = cloneData[0].countries_stat[idx - 1];
                    cloneData[0].countries_stat[idx - 1] = store;
                    idx = idx - 1;
                }
            }
        }

        sortKeys[key] = true;
    } else {
        for (let i = 0; i < cloneData[0].countries_stat.length / 2; i++) {
            var store = cloneData[0].countries_stat[cloneData[0].countries_stat.length - 1 - i];
            cloneData[0].countries_stat[cloneData[0].countries_stat.length - 1 - i] = cloneData[0].countries_stat[i];
            cloneData[0].countries_stat[i] = store;
        }
    }

    var tableBodyContent = document.getElementById("tblbody2");
    var infotbl = "";
    for (var i = 0; i < cloneData[0].countries_stat.length; i++) {
        infotbl = infotbl + "<tr>";
        infotbl = infotbl + "<th>" + cloneData[0].countries_stat[i].country_name + "</th>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].cases + "</td>";
        infotbl = infotbl + "<td class = 'newcases'>" + cloneData[0].countries_stat[i].new_cases + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].deaths + "</td>";
        infotbl = infotbl + "<td class = 'newdeaths'>" + cloneData[0].countries_stat[i].new_deaths + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].active_cases + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].serious_critical + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].total_recovered + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].total_cases_per_1m_population + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].deaths_per_1m_population + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].total_tests + "</td>";
        infotbl = infotbl + "<td>" + cloneData[0].countries_stat[i].tests_per_1m_population + "</td>";
        infotbl = infotbl + "</tr>";
    }

    tableBodyContent.innerHTML = infotbl;
}
