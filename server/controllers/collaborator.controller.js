import collaborationModel from '../models/collaboration.model.js';
import userModel from '../models/user.model.js';

const addCollaborator = async (req, res) => {
  const documentId = req.params.id;
  const { email, role } = req.body;
  try {
    const collaborator = await userModel.findOne({ email });

    if (!collaborator) {
      console.log('No user found');
      return res
        .status(404)
        .json({ success: false, msg: 'No user found with this email' });
    }
    if (collaborator.isVerified === false) {
      console.log('user is not verified');
      return res
        .status(400)
        .json({ success: false, msg: 'User is not verified' });
    }
    const existing = await collaborationModel.findOne({
      documentId,
      userId: collaborator._id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        msg: 'User already a collaborator',
      });
    }

    const newCollaborator = new collaborationModel({
      documentId,
      userId: collaborator._id,
      role,
      invitedBy: req.user._id,
    });
    await newCollaborator.save();
    console.log('new Collorator added successfuly');
    return res
      .status(200)
      .json({ success: true, msg: 'New collaborator added successfuly' });
  } catch (error) {
    console.log('error in adding collaborator :' + error.message);
    return res.status(500).json({
      success: false,
      msg: 'error in adding collaborator',
      error: error.message,
    });
  }
};

const viewCollaborators = async (req, res) => {
  const documentId = req.params.id;

  try {
    const collaborators = await collaborationModel
      .find({ documentId })
      .populate('userId', 'email name');
    return res.status(200).json({
      success: true,
      msg: 'Collaborators retrieved successfully',
      collaborators,
    });
  } catch (error) {
    console.log('error in viewing collaborators :' + error.message);
    return res.status(500).json({
      success: false,
      msg: 'error in viewing collaborators',
      error: error.message,
    });
  }
};
export { addCollaborator, viewCollaborators };
