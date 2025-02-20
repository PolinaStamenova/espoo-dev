import { Group } from '@api/models/group';
import { render, screen } from 'test-utils';
import mockManyGroups from 'utils/mocks/groups';
import { RoadmapSurvey } from './roadmap-survey';

let groups: Group[] = [];

describe('RoadmapSurvey', () => {
  beforeEach(() => {
    groups = JSON.parse(JSON.stringify(mockManyGroups));
  });

  it('should render component with all groups', () => {
    const rendered = render(<RoadmapSurvey groups={groups} />);
    groups.forEach((group) =>
      expect(rendered.getByTestId(`group-${group.id}`)).toBeInTheDocument()
    );
  });

  it('should show all survey names', () => {
    const rendered = render(<RoadmapSurvey groups={groups} />);
    groups.forEach((group) =>
      group.surveys.forEach((survey) =>
        expect(rendered.getByText(survey.name)).toBeInTheDocument()
      )
    );
  });

  it('should render available and doing surveys in green scale', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId(`icon-${groups[0].surveys[0].name}`)).toHaveStyle(
      'border: 4px solid green'
    );
    expect(screen.getByTestId(`icon-${groups[1].surveys[0].name}`)).toHaveStyle(
      'border: 4px solid green'
    );
  });

  it('should render blocked surveys in gray scale', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId(`icon-${groups[2].surveys[0].name}`)).toHaveStyle(
      'border: 4px solid gray'
    );
  });

  it('should not render groups when not passed and show message', () => {
    render(<RoadmapSurvey groups={[]} />);
    expect(screen.getByText('No surveys to show =/')).toBeInTheDocument();
  });

  it('should render "icon from icon_url" when the survey has "icon_url"', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId(`icon-${groups[0].surveys[0].name}`)).toHaveStyle(
      `background-image: url(${groups[0].surveys[0].icon_url})`
    );
  });

  it('should render "default survey icon" when the survey has no "icon_url"', () => {
    render(<RoadmapSurvey groups={groups} />);
    expect(screen.getByTestId(`icon-${groups[1].surveys[0].name}`)).toHaveStyle(
      'background-image: url(\'/assets/default_survey_icon.png\')'
    );
  });
});
