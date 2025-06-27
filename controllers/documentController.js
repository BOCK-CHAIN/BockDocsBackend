const prisma = require('../prismaClient');

exports.createDocument = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const document = await prisma.document.create({
      data: {
        userId, // just set the userId field
        title: title || "Untitled Document",
        content: content || "",
      },
    });
    res.status(201).json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get a document by ID
exports.getDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await prisma.document.findUnique({
      where: { id: Number(id) },
    });
    if (!document) return res.status(404).json({ error: 'Document not found' });
    res.json(document);
  } catch (error) {
    console.error('Error getting document:', error);
    res.status(500).json({ error: 'Failed to get document' });
  }
};

// Get all documents for a user
exports.getUserDocuments = async (req, res) => {
  try {
    const { userId } = req.params;
    const documents = await prisma.document.findMany({
      where: { userId: Number(userId) },
      orderBy: { lastModified: 'desc' },
    });
    res.json(documents);
  } catch (error) {
    console.error('Error getting user documents:', error);
    res.status(500).json({ error: 'Failed to get user documents' });
  }
};

// Update a document
exports.saveDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const document = await prisma.document.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.json(document);
  } catch (error) {
    console.error('Error saving document:', error);
    res.status(500).json({ error: 'Failed to save document' });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.document.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
};
