
import { UserInfo } from '../../types/UserInfo';

interface EditProfileProps {
  userData: UserInfo;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePrivacyToggle: (key: keyof UserInfo['privacy']) => void;
  handleUpdateProfile: () => Promise<void>;
  skillInput: string;
  setSkillInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddSkill: () => void;
  handleRemoveSkill: (skill: string) => void;
  interestInput: string;
  setInterestInput: React.Dispatch<React.SetStateAction<string>>;
  handleAddInterest: () => void;
  handleRemoveInterest: (interest: string) => void;
  isLoading: boolean;
}

const EditProfile: React.FC<EditProfileProps> = ({
  userData,
  handleInputChange,
  handlePrivacyToggle,
  handleUpdateProfile,
  skillInput,
  setSkillInput,
  handleAddSkill,
  handleRemoveSkill,
  interestInput,
  setInterestInput,
  handleAddInterest,
  handleRemoveInterest,
  isLoading
}) => {
  return (
    <div className="profile-settings">
      <div className="settings-section">
        <h2 className="section-title">Profile Settings</h2>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            className="bio-editor"
            value={userData.bio}
            onChange={handleInputChange}
            placeholder="Tell others about yourself..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={userData.location}
            onChange={handleInputChange}
            placeholder="Your location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            type="url"
            id="website"
            name="website"
            value={userData.website}
            onChange={handleInputChange}
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="github">GitHub Username</label>
          <input
            type="text"
            id="github"
            name="github"
            value={userData.github}
            onChange={handleInputChange}
            placeholder="yourusername"
          />
        </div>

        <div className="form-group">
          <label>Skills</label>
          <div className="input-with-button">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Add a skill (e.g., JavaScript)"
            />
            <button 
              onClick={handleAddSkill}
              className="add-button"
              type="button"
              disabled={!skillInput.trim()}
            >
              Add
            </button>
          </div>
          <div className="skills-list edit-mode">
            {userData.skills.map((skill, index) => (
              <div key={index} className="tag-with-remove">
                <span className="skill-tag">{skill}</span>
                <button 
                  onClick={() => handleRemoveSkill(skill)}
                  className="remove-button"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
            {userData.skills.length === 0 && (
              <p className="no-items-message">No skills added yet. Add some to showcase your expertise.</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Interests</label>
          <div className="input-with-button">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              placeholder="Add an interest (e.g., Machine Learning)"
            />
            <button 
              onClick={handleAddInterest}
              className="add-button"
              type="button"
              disabled={!interestInput.trim()}
            >
              Add
            </button>
          </div>
          <div className="interests-list edit-mode">
            {userData.interests.map((interest, index) => (
              <div key={index} className="tag-with-remove">
                <span className="interest-tag">{interest}</span>
                <button 
                  onClick={() => handleRemoveInterest(interest)}
                  className="remove-button"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
            {userData.interests.length === 0 && (
              <p className="no-items-message">No interests added yet. Add some to show what you're passionate about.</p>
            )}
          </div>
        </div>

        <button
          onClick={handleUpdateProfile}
          className="save-settings-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Saving Changes...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;