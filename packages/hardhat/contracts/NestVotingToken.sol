// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NestVotingToken is ERC20 {


    address private bank;

    mapping(address => bool) public CHAIRMAN;
    mapping(address => bool) public MEMBER;
    mapping(address => bool) public BOARD;
    mapping(address => bool) public BANK;
    mapping(address => bool) public TEACHER;
    mapping(address => bool) public STUDENT;


    address public chairman;
    constructor() ERC20("NestVotingToken", "NVT") {
        CHAIRMAN[msg.sender] = true;
        MEMBER[msg.sender] = true;
        BOARD[msg.sender] = true;
        CHAIRMAN[0x45Cb151f59d0BF30cD22eE081293e58F88b1fd48] = true;
        MEMBER[0x45Cb151f59d0BF30cD22eE081293e58F88b1fd48] = true;
        BOARD[0x45Cb151f59d0BF30cD22eE081293e58F88b1fd48] = true;
        chairman = msg.sender;
        _mint(msg.sender, 5000 * 10 ** decimals());
    }

    event VoteCasted(address voter, uint256 pollID, string vote);
	event PollCreation(uint256 pollID, string description, uint256 numOfCategories);
	event PollStatusUpdate(uint256 pollID, PollStatus status);


	enum PollStatus { IN_PROGRESS, DISABLED, RESULTSHOWED }

    struct Poll
	{
        string name;
		string description;
		PollStatus status;
        mapping(string => uint256) voteCounts;
		mapping(address => Voter) voterInfo;
        string[] candidates;
        uint256[] percents;
        uint256 vote ;
	}

	struct Voter
	{
		bool hasVoted;
		string vote;
	}

    uint256 public pollCount;
	mapping(uint256 => Poll) public polls;
    mapping(address => bool) public teachers;
    mapping(address => bool) public students;
    mapping(address => bool) public board;
    uint256[] public pollNums;

    Poll[] public Polls;
    address[] public Teachers;
    address[] public Students;
    address[] public Board;

    

    function createPoll(string memory _name, string memory _description, string[] memory _categories) external onlyChairman()  returns (uint256)
	{
		pollCount++;
        polls[pollCount].name = _name;
		polls[pollCount].status = PollStatus.IN_PROGRESS;
		polls[pollCount].description = _description;
        polls[pollCount].candidates = _categories;
        pollNums.push(pollCount);

        for(uint i = 0; i < _categories.length; i++) {
            polls[pollCount].voteCounts[_categories[i]] = 0;
        }

		emit PollCreation(pollCount, polls[pollCount].description, _categories.length);
		return pollCount;
	}


  function addTeachers(address[] memory _teachers) external onlyBoard {
    for(uint i = 0; i < _teachers.length; i++) {
        Teachers.push(_teachers[i]);
        teachers[_teachers[i]] = true;
        _mint(_teachers[i], 3000 * 10 ** decimals());
        TEACHER[_teachers[i]] = true;
        MEMBER[_teachers[i]] = true;
    }
  }

  function addBank(address _bank) external onlyChairman()  {
        bank = _bank;

        BANK[_bank] = true;
  }

  function addStudents(address[] memory _students) onlyBoard external  {

    for(uint i = 0; i < _students.length; i++) {
        students[_students[i]] = true;
        Students.push(_students[i]);
        _mint(_students[i], 1000 * 10 ** decimals());

        STUDENT[_students[i]] = true;
        MEMBER[_students[i]] = true;
    }
  }

  function addBoards(address[] memory _boards) external onlyChairman()  {
    for(uint i = 0; i < _boards.length; i++) {
        Board.push(_boards[i]);
        board[_boards[i]] = true;
        _mint(_boards[i], 4000 * 10 ** decimals());
        BOARD[_boards[i]] = true;
        MEMBER[_boards[i]] = true;
    }
  }

    function getPollStatus(uint256 _pollID) public view validPoll(_pollID) returns (PollStatus)
	{
		return polls[_pollID].status;
	}

    function castVote(uint256 _pollID, string memory _vote) external
     validPoll(_pollID) onlyMember notDisabled(_pollID)
	{
		require(polls[_pollID].status == PollStatus.IN_PROGRESS, "Poll not in progress.");
		require(polls[_pollID].voterInfo[msg.sender].hasVoted, "User has already voted.");

		transferFrom(msg.sender, bank, 100);

		Poll storage curPoll = polls[_pollID];

		curPoll.voterInfo[msg.sender] = Voter({
				hasVoted: true,
				vote: _vote
		});

        curPoll.voteCounts[_vote] += 1;
        curPoll.vote+=1;

		emit VoteCasted(msg.sender, _pollID, _vote);
	}


    function compileVotes(uint256 _pollID)  public onlyChairmanOrTeacher notDisabled(_pollID) {
        Poll storage curPoll = polls[_pollID];

        string[] memory candidates = curPoll.candidates;
        uint256[] memory percents;
        uint totalVotes = candidates.length;
    
        for (uint i = 0; i < totalVotes; i++) {
            percents[i] = curPoll.voteCounts[candidates[i]] * 10000 / totalVotes;
            
        }

        curPoll.percents = percents;
    }

        function showResults(uint256 _pollID) public view notStudent notDisabled(_pollID) returns (string[] memory, uint256[] memory){
            Poll storage curPoll = polls[_pollID];

            return (curPoll.candidates, curPoll.percents);
        }

        function showStudents() public view returns (address[] memory){

            return (Students);
        }

        function showTeachers() public view returns (address[] memory){

            return (Teachers);
        }

        function showBoards() public view returns (address[] memory){

            return (Board);
        }

       

        function showPolls() public view returns (uint256[] memory){

            return (pollNums);
        }

        function showVote(uint256 _pollID) public view returns (uint256){
            Poll storage curPoll = polls[_pollID];
            return (curPoll.vote);
        }

        function showPoll(uint256 _pollID) public view returns (
            string memory, string memory, PollStatus status,string[] memory){

            Poll storage curPoll = polls[_pollID];
            return (curPoll.name,curPoll.description,curPoll.status,curPoll.candidates);
        }

        function disablePoll(uint256 _pollID) public onlyChairman()  {

            Poll storage curPoll = polls[_pollID];

            if(curPoll.status == PollStatus.IN_PROGRESS){
                curPoll.status = PollStatus.DISABLED;
                emit PollStatusUpdate( _pollID, curPoll.status);
                
            }else{
                curPoll.status = PollStatus.IN_PROGRESS;
                emit PollStatusUpdate(_pollID, curPoll.status);
               
            }

        }

    modifier onlyChairmanOrTeacher() {
        require(
            CHAIRMAN[ msg.sender] || TEACHER[ msg.sender],
            
            "Not a Chairman nor a Teacher."
        );
        _;
    }

    modifier onlyChairman() {
        require(
            CHAIRMAN[ msg.sender],
            
            "Not a Chairman"
        );
        _;
    }

    modifier onlyMember() {
        require(
            MEMBER[ msg.sender],
            
            "Not a Member"
        );
        _;
    }

    modifier onlyBoard() {
        require(
            BOARD[ msg.sender],
            
            "Not a Board Member"
        );
        _;
    }

    modifier notStudent() {
        require(
            CHAIRMAN[ msg.sender] || TEACHER[ msg.sender] || BOARD[ msg.sender],
            
            "You are a Student."
        );
        _;
    }

    modifier validPoll(uint256 _pollID)
	{
		require(_pollID > 0 && _pollID <= pollCount, "Not a valid poll Id.");
		_;
	}

    modifier notDisabled(uint256 _pollID)
	{
        Poll storage curPoll = polls[_pollID];
		require(curPoll.status != PollStatus.DISABLED, "Poll is Disabled");
		_;
	}

    function mint(address to, uint256 amount) public onlyChairman()  {
        _mint(to, amount);
    }



    
}
