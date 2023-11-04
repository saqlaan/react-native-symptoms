enum SeverityEnum {
  mild = 'Mild',
  moderate = 'Moderate',
  severe = 'Severe',
  critical = 'Critical',
}

type SymptomsType = {
  id?: string;
  name: string;
  date: string;
  severity: SeverityEnum | undefined;
  details: string;
};

export { SeverityEnum, SymptomsType };
