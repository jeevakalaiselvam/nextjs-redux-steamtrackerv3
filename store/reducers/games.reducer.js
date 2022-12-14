import {
  getPhaseFiltedAchievements,
  removeIgnoredAchievements,
} from "../../helpers/achievementHelper";
import {
  GAMES_OPTION_COMPLETION_DESC,
  GAMES_OPTION_COMPLETION_STARTED,
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME,
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_LOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKTIME,
} from "../../helpers/filterHelper";
import {
  addHiddenToGames,
  ALL,
  refreshGameDataByGameId,
  updateAchievementPhaseForGame,
} from "../../helpers/gameHelper";
import {
  FETCH_ALL_GAMES_ERROR,
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  GAMES_FILTER_CHANGED,
  GAMES_SEARCH_CHANGED,
  GAME_DATA_REFRESH,
  GAME_FILTER_CHANGED,
  GAME_SEARCH_CHANGED,
  SET_HIDDEN_DATA,
  SET_PHASE1_ACHIEVEMENTS,
  SET_PHASE1_SEARCH,
  SET_PHASE2_SEARCH,
  SET_PHASE3_SEARCH,
  SET_PHASE4_SEARCH,
  SET_PHASE5_SEARCH,
  SET_PHASE6_SEARCH,
  SET_PHASE2_ACHIEVEMENTS,
  SET_PHASE3_ACHIEVEMENTS,
  SET_PHASE4_ACHIEVEMENTS,
  SET_PHASE5_ACHIEVEMENTS,
  SET_PHASE6_ACHIEVEMENTS,
  SET_PHASE_ADDED_GAME,
  UPDATE_PHASE_ACHIEVEMENT,
  RESET_KANBAN_BOARD,
  SET_PLANNER_VIEW_TYPE,
  SET_PLANNER_UNLOCKED_TYPE,
  SHOW_HISTORY_ACHIEVEMENTS,
  HIDE_HISTORY_ACHIEVEMENTS,
  SHOW_JOURNAL_RIGHTSIDEBAR,
  HIDE_JOURNAL_RIGHTSIDEBAR,
} from "../types/games.types";

const INITIAL_STATE = {
  games: [],
  hiddenGames: {},
  settings: {
    gamesPage: {
      filterOption: GAMES_OPTION_COMPLETION_DESC,
      searchTerm: "",
      leftSidebarOpen: true,
      rightSidebarOpen: false,
      leftSidebarWidth: "200px",
      rightSidebarWidth: "450px",
    },
    gamePage: {
      filterOption: GAME_OPTION_PERCENTAGE_DESC_LOCKED,
      searchTerm: "",
      leftSidebarOpen: true,
      rightSidebarOpen: true,
      leftSidebarWidth: "200px",
      rightSidebarWidth: "450px",
      showHistoryModal: false,
      historyModalAchievements: [],
      historyModalTitle: "",
      selectedAchievement: "",
      journalContainerVisible: false,
    },
    plannerPage: {
      leftSidebarOpen: true,
      rightSidebarOpen: false,
      leftSidebarWidth: "200px",
      rightSidebarWidth: "450px",
    },
  },
  planner: {
    phaseAddedGame: {},
    phase1Achievements: [],
    phase2Achievements: [],
    phase3Achievements: [],
    phase4Achievements: [],
    phase5Achievements: [],
    phase6Achievements: [],
    phase1Filter: GAME_OPTION_PERCENTAGE_DESC_LOCKED,
    phase1Search: "",
    phase2Filter: GAME_OPTION_PERCENTAGE_DESC_LOCKED,
    phase2Search: "",
    phase3Filter: GAME_OPTION_PERCENTAGE_DESC_LOCKED,
    phase3Search: "",
    phase4Filter: GAME_OPTION_PERCENTAGE_DESC_LOCKED,
    phase4Search: "",
    phase5Filter: GAME_OPTION_PERCENTAGE_DESC_LOCKED,
    phase5Search: "",
    phase6Filter: GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME,
    phase6Search: "",
    plannerViewActive: true,
    unlockedShowToday: true,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_GAMES_REQUEST:
      return {
        ...state,
        games: [],
      };
    case FETCH_ALL_GAMES_SUCCESS:
      return {
        ...state,
        games: removeIgnoredAchievements(payload),
      };
    case FETCH_ALL_GAMES_ERROR:
      return {
        ...state,
        games: [],
      };

    case GAMES_FILTER_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamesPage: {
            ...state.settings.gamesPage,
            filterOption: payload,
          },
        },
      };
    case GAMES_SEARCH_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamesPage: {
            ...state.settings.gamesPage,
            searchTerm: payload,
          },
        },
      };

    case GAME_FILTER_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            filterOption: payload,
          },
        },
      };
    case GAME_SEARCH_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            searchTerm: payload,
          },
        },
      };

    case SHOW_HISTORY_ACHIEVEMENTS:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            showHistoryModal: true,
            historyModalAchievements: payload.achievements,
            historyModalTitle: payload.modalTitle,
          },
        },
      };
    case HIDE_HISTORY_ACHIEVEMENTS:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            showHistoryModal: false,
            historyModalAchievements: payload.achievements,
            historyModalTitle: payload.modalTitle,
          },
        },
      };

    case SHOW_JOURNAL_RIGHTSIDEBAR:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            journalContainerVisible: payload.rightSidebarOpen,
            selectedAchievement: payload.selectedAchievement,
          },
        },
      };

    case HIDE_JOURNAL_RIGHTSIDEBAR:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            journalContainerVisible: payload.rightSidebarOpen,
          },
        },
      };

    case SET_HIDDEN_DATA:
      return {
        ...state,
        hiddenGames: {
          ...state.hiddenGames,
          [payload.gameId]: payload.hiddenAchievements,
        },
      };

    case GAME_DATA_REFRESH:
      return {
        ...state,
        games: refreshGameDataByGameId(
          state.games,
          payload.gameId,
          payload.gameRefreshedData
        ),
      };

    case SET_PHASE_ADDED_GAME:
      return {
        ...state,
        planner: {
          ...state.planner,
          phaseAddedGame: payload,
        },
      };

    case UPDATE_PHASE_ACHIEVEMENT:
      return {
        ...state,
        planner: {
          ...state.planner,
          phaseAddedGame: updateAchievementPhaseForGame(
            state.planner.phaseAddedGame,
            payload.achievementName,
            payload.phaseValue
          ),
        },
      };

    case SET_PHASE1_ACHIEVEMENTS:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase1Achievements: payload,
        },
      };
    case SET_PHASE2_ACHIEVEMENTS:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase2Achievements: payload,
        },
      };

    case SET_PHASE3_ACHIEVEMENTS:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase3Achievements: payload,
        },
      };

    case SET_PHASE4_ACHIEVEMENTS:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase4Achievements: payload,
        },
      };

    case SET_PHASE5_ACHIEVEMENTS:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase5Achievements: payload,
        },
      };
    case SET_PHASE6_ACHIEVEMENTS:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase6Achievements: payload,
        },
      };

    case SET_PHASE1_SEARCH:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase1Search: payload,
        },
      };

    case SET_PHASE2_SEARCH:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase2Search: payload,
        },
      };

    case SET_PHASE3_SEARCH:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase3Search: payload,
        },
      };

    case SET_PHASE4_SEARCH:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase4Search: payload,
        },
      };

    case SET_PHASE5_SEARCH:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase5Search: payload,
        },
      };

    case SET_PHASE6_SEARCH:
      return {
        ...state,
        planner: {
          ...state.planner,
          phase6Search: payload,
        },
      };

    case RESET_KANBAN_BOARD:
      return {
        ...state,
        planner: {
          ...state.planner,
          phaseAddedGame: payload.newPhaseAddedGame,
        },
      };

    case SET_PLANNER_VIEW_TYPE:
      return {
        ...state,
        planner: {
          ...state.planner,
          plannerViewActive: !state.planner.plannerViewActive,
        },
      };

    case SET_PLANNER_UNLOCKED_TYPE:
      return {
        ...state,
        planner: {
          ...state.planner,
          unlockedShowToday: !state.planner.unlockedShowToday,
        },
      };

    default:
      return state;
  }
};

export default reducer;
