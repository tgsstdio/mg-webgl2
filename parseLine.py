class TSInterpreter:
  def __init__(self, className, isInterface):
    self.references = {}
    self.className = className
    self.isInterface = isInterface

    translatedTypes = {}
    translatedTypes['bool'] = 'boolean'
    translatedTypes['UInt32'] = 'number'
    translatedTypes['UInt64'] = 'number'
    translatedTypes['UInt32[]'] = 'Array<number>'
    translatedTypes['int'] = 'number'
    translatedTypes['uint'] = 'number'
    translatedTypes['uint[]'] = 'Array<number>'
    translatedTypes['Int32'] = 'number'
    translatedTypes['string'] = 'string'
    translatedTypes['String'] = 'string'
    translatedTypes['string[]'] = 'Array<string>'
    translatedTypes['float'] = 'number'
    translatedTypes['IntPtr'] = 'any'
    translatedTypes['UIntPtr'] = 'any'
    translatedTypes['float[]'] = 'Array<number>'
    translatedTypes['Result'] = 'MgResult'
    self.translatedTypes = translatedTypes

  def parse(self, textData):
    fields = []
    for line in textData.split('\n'):
      inputData = line.strip()
      if inputData and '//' not in inputData:       
        field = self.parseLine(inputData)      
        fields.append(field)

    classType = 'interface' if self.isInterface else 'class'

    for ref in tp.references:
      if ref.startswith('Mg') or ref.startswith('IMg'):
        print('/// <reference path="../mg/' + ref + '.ts" />')
      else:
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

    typeIndex = 1
    nameIndex = 2
    
    if tokens[0] != 'public':
      typeIndex = 0
      nameIndex = 1
    
    paramName = tokens[nameIndex][0].lower() + tokens[nameIndex][1:]

    localType = tokens[typeIndex]
    comment = ''

    for warningType in ['UInt64', 'IntPtr', 'UIntPtr']:    
      if localType == warningType:
        comment = '// WARN: ' + paramName + ' requires ' + warningType    

    if localType in self.translatedTypes:
      localType = self.translatedTypes[localType]
    elif localType.endswith('[]'):
      elementType = tokens[typeIndex][:-2]
      localType = 'Array<' + elementType + '>'
      self.insertType(elementType)
    else:
      self.insertType(localType)

    return (comment, paramName, localType)

  def insertType(self, localType):
    if localType not in self.references:
      self.references[localType] = localType

textData = """
		GLMemoryBufferType BufferType { get; }
		int BufferSize { get; }
		uint BufferId { get; }
		IntPtr Handle { get; }
	      """		

tp = TSInterpreter('IGLDeviceMemory', True)
tp.parse(textData)
