const NewsModal = require("../Schema/Modal.jsx")


//   Create New News Articles 
const AddNews = async (req, res) => {
    try {
        //    Validation if this same article already exsit 

        const existingNews = await NewsModal.findOne({ title: req.body.title });

        if (existingNews) {
            return res.status(409).json({ error: 'News  with this title already exists' });
        }

        const newNews = await NewsModal.create(req.body);
        res.status(201).json(newNews);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Read(get) All news articles
const GetNews = async (req, res) => {
    try {
        const allNews = await NewsModal.find();
        res.status(200).json(allNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//   Read (get) News articles by id
const GetNewsId = async (req, res) => {
    try {

        //    Validation if this same article  Not exsit 
        const newsById = await NewsModal.findById(req.params.id);
        if (!newsById) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.status(200).json(newsById);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update(put) news articles by Id

const UpdateNews = async (req, res) => {
    try {
        //    Validation if this same article  Not exsit 
        const updatedNews = await NewsModal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedNews) {
            return res.status(404).json({ error: 'News  not found' });
        }
        res.status(200).json(updatedNews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//   Delete News articles by Id

const deleteNews = async (req, res) => {
    try {
        //    Validation if this same article  Not exsit 
        const DeleteNews = await NewsModal.findByIdAndDelete(req.params.id);

        if (!DeleteNews) {
            return res.status(404).json({ error: 'News  not found' });
        }
        res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const SearchNews = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(404).json({ error: "keyword is required" });
        }

        const serachResult = await NewsModal.find({
            $or: [
                { title: { $regex: new RegExp(keyword, 'i') } },
                { content: { $regex: new RegExp(keyword, 'i') } },
            ],
        });
        res.status(200).json(serachResult);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const FilterNews = async (req,res) => {
    try {
        
        const { category } = req.params;

    if (!category) {
      return res.status(400).json({ error: 'Category is required ' });
    }

    const filteredNews = await NewsModal.find({ 'articles.category': category });

    res.status(200).json(filteredNews);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    AddNews,
    GetNews,
    GetNewsId,
    UpdateNews,
    deleteNews,
    SearchNews,
    FilterNews,
}

