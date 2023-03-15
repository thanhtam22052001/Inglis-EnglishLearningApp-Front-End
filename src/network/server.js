const SERVER_NAME = '192.168.26.237';
//const SERVER_NAME = '192.168.0.102';
const API_KEY = 'VwqGhYlAO3ihZ7TAjX4AlYGrbJcrezA5';

const get_List_Rank = async () => {
  try {
    let response = await fetch('http://' + SERVER_NAME + ':3000/rank', {
      method: 'GET',
      //Request Type
    });
    let responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const getUser_ByID = async uid => {
  try {
    let response = await fetch('http://' + SERVER_NAME + ':3000/user/' + uid, {
      method: 'GET',
      //Request Type
    });
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_LessonDone = async uid => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/detaillesson/lessondone/' + uid,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_SumWordDone = async uid => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/detaillesson/worddone/' + uid,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_SumWordNotDone = async uid => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/detaillesson/wordnotdone/' + uid,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
const get_ContentofCourse = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/course/content/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_LessonofCourse = async (id, idCourse) => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/lesson/' + id + '/' + idCourse,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_FolderExistByID = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/folder/folderexistByID/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_FolderExist = async () => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/folder/folderexist',
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
const get_AllFolder = async id => {
  try {
    let response = await fetch('http://' + SERVER_NAME + ':3000/folder/' + id, {
      method: 'GET',
      //Request Type
    });
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_CourseDone = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/course/coursedone/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_WordDoneAndRank = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/user/summary/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_VocabularyByLesson = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/vocabulary/getbylesson/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_VocabularyByFolder = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/vocabulary/getbyfolder/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_LearedCourse = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/learning/getcoursedone/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_RecommendCourse = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/learning/getrecommendcourse/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
const get_AllCourse = async () => {
  try {
    let response = await fetch('http://' + SERVER_NAME + ':3000/course', {
      method: 'GET',
      //Request Type
    });
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const get_APiDictionary = async word => {
  try {
    let response = await fetch(
      'https://api.dictionaryapi.dev/api/v2/entries/en/' + word,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    // console.log(JSON.stringify(responseJson)[0].word + 'alo');
    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

const get_AllVocabularyByCourse = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/vocabulary/getbycourse/' + id,
      {
        method: 'GET',
        //Request Type
      },
    );
    let responseJson = await response.json();
    //console.log(responseJson.result);
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const getAllArticlesByCategory = async category => {
  try {
    let response = await fetch(
      `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${API_KEY}`,
      {
        method: 'GET',
      },
    );
    let responseJson = await response.json();
    return responseJson.results;
  } catch (error) {
    console.error(error);
  }
};

const getPopularArticlesByPeriod = async period => {
  try {
    let response = await fetch(
      `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${API_KEY}`,
      {
        method: 'GET',
      },
    );
    let responseJson = await response.json();
    return responseJson.results;
  } catch (error) {
    console.error(error);
  }
};

const searchArticles = async query => {
  try {
    let response = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`,
      {
        method: 'GET',
      },
    );
    let responseJson = await response.json();
    return responseJson.response.docs;
  } catch (error) {
    console.error(error);
  }
};

const updateRank = async (id, rank) => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/user/update/' + id + '/' + rank,
      {
        method: 'PUT',
        //Request Type
      },
    );
    //let responseJson = await response.json();
    //console.log(responseJson.result);
    //return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (name, phone, job, id) => {
  try {
    let response = await fetch(
      'http://' +
        SERVER_NAME +
        ':3000/user/updateuser/' +
        name +
        '/' +
        phone +
        '/' +
        job +
        '/' +
        id,
      {
        method: 'PUT',
        //Request Type
      },
    );
    //let responseJson = await response.json();
    //console.log(responseJson.result);
    //return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
const updateNumWord = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/folder/updatenumword/' + id,
      {
        method: 'PUT',
        //Request Type
      },
    );
    //let responseJson = await response.json();
    //console.log(responseJson.result);
    //return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
const updateNameWord = async (name, id) => {
  try {
    let response = await fetch(
      'http://' +
        SERVER_NAME +
        ':3000/folder/updatenameword/' +
        name +
        '/' +
        id,
      {
        method: 'PUT',
        //Request Type
      },
    );
    //let responseJson = await response.json();
    //console.log(responseJson.result);
    //return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
const deleteFolder = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/folder/deletefolder/' + id,
      {
        method: 'DELETE',
        //Request Type
      },
    );
    //let responseJson = await response.json();
    //console.log(responseJson.result);
    //return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
const deleteDetailFolder = async id => {
  try {
    let response = await fetch(
      'http://' + SERVER_NAME + ':3000/folder/deletedetail/' + id,
      {
        method: 'DELETE',
        //Request Type
      },
    );
    //let responseJson = await response.json();
    //console.log(responseJson.result);
    //return responseJson.result;
  } catch (error) {
    console.error(error);
  }
};
export {
  get_List_Rank,
  getUser_ByID,
  get_LessonDone,
  get_SumWordDone,
  get_SumWordNotDone,
  get_ContentofCourse,
  get_LessonofCourse,
  get_AllFolder,
  get_CourseDone,
  get_WordDoneAndRank,
  get_FolderExistByID,
  get_FolderExist,
  get_VocabularyByLesson,
  get_VocabularyByFolder,
  get_LearedCourse,
  get_RecommendCourse,
  get_AllCourse,
  get_APiDictionary,
  get_AllVocabularyByCourse,
  updateRank,
  updateNumWord,
  deleteDetailFolder,
  deleteFolder,
  updateNameWord,
  updateUser,
  getAllArticlesByCategory,
  getPopularArticlesByPeriod,
  searchArticles,
};

const insert_NewUser = async (uid, nameuser, emailuser) => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  try {
    await fetch('http://' + SERVER_NAME + ':3000/user/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_User: uid,
        Name: nameuser,
        Email: emailuser,
        Time: date + '/' + month + '/' + year,
      }),
    });
  } catch (error) {
    console.log('hello');
  }
};

const insert_Learning = async (uid, idCourse, idLesson, state) => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  try {
    await fetch('http://' + SERVER_NAME + ':3000/learning/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_User: uid,
        ID_Course: idCourse,
        ID_Lesson: idLesson,
        State: state,
      }),
    });
  } catch (error) {
    console.log('hello');
  }
};

const insert_newFolder = async (folder, name, number, uid, numword, date) => {
  try {
    await fetch('http://' + SERVER_NAME + ':3000/folder/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_Folder: folder,
        Name_Folder: name,
        Number: number,
        ID_User: uid,
        Num_Word: numword,
        Date: date,
      }),
    });
  } catch (error) {
    console.log('hello');
  }
};

const insert_WordFolder = async (folder, id) => {
  try {
    await fetch('http://' + SERVER_NAME + ':3000/folder/insertword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_Folder: folder,
        ID_Vocabulary: id,
      }),
    });
  } catch (error) {
    console.log('hello');
  }
};
export {insert_NewUser, insert_Learning, insert_newFolder, insert_WordFolder};
