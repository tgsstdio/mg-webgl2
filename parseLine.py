class TSInterpreter:
  def __init__(self, className, isInterface):
    self.references = {}
    self.className = className
    self.isInterface = isInterface

  def parse(self, textData):
    fields = []
    for line in textData.split('\n'):
      inputData = line.strip()
      if inputData and '//' not in inputData:       
        field = self.parseLine(inputData)      
        fields.append(field)

    classType = 'interface' if self.isInterface else 'class'

    for ref in tp.references:
      print('/// <reference path="' + ref + '.ts" />')

    if (len(tp.references) > 0):
      print('')
  
    print('namespace Magnesium {')
    print('  export ' + classType + ' ' + self.className + ' {')
    
    for field in fields:
      if field[0]:
        print('    ' + field[0])
      print('    ' + field[1] + ': ' + field[2] + ';')      
    print('  }')    
    print('}')
  
  def parseLine(self, line):
    tokens = line.split()

    if (len(tokens) == 0):
        return ''

    translatedTypes = {}
    translatedTypes['bool'] = 'boolean'
    translatedTypes['UInt32'] = 'number'
    translatedTypes['UInt64'] = 'number'
    translatedTypes['UInt32[]'] = 'Array<number>'
    translatedTypes['int'] = 'number'
    translatedTypes['uint'] = 'number'
    translatedTypes['Int32'] = 'number'
    translatedTypes['string'] = 'string'
    translatedTypes['String'] = 'string'
    translatedTypes['string[]'] = 'Array<string>'
    translatedTypes['float'] = 'number'
    translatedTypes['float[]'] = 'Array<number>'
    translatedTypes['Result'] = 'MgResult'

    paramName = tokens[2][0].lower() + tokens[2][1:]

    comment = ''
    if tokens[1] == 'UInt64':
      comment = '// WARN: ' + paramName + ' requires UInt64'

    localType = tokens[1]
    if localType in translatedTypes:
      localType = translatedTypes[localType]
    elif localType.endswith('[]'):
      elementType = tokens[1][:-2]
      localType = 'Array<' + elementType + '>'
      self.insertType(elementType)
    else:
      self.insertType(localType)

    return (comment, paramName, localType)

  def insertType(self, localType):
    if localType not in self.references:
      self.references[localType] = localType

textData = """
		public UInt32 Flags { get; set; }
		public MgDynamicState[] DynamicStates { get; set; }
		"""		

tp = TSInterpreter('MgPipelineDynamicStateCreateInfo', False)
tp.parse(textData)





  
